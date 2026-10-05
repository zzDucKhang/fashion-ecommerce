// src/modules/loyalty-engage/hooks/useChatSocket.ts
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { sendSocketHeartbeat, type ChatMessageItem } from "../api";

export interface UseChatSocketOptions {
  serverUrl?: string;
  userId?: number;
  autoConnect?: boolean;
}

export interface UseChatSocketReturn {
  socket: Socket | null;
  socketId: string | null;
  isConnected: boolean;
  messages: ChatMessageItem[];
  sendMessage: (content: string, receiverId?: number) => void;
  clearMessages: () => void;
}

const DEFAULT_SERVER_URL =
  process.env.NEXT_PUBLIC_WS_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3000";

const HEARTBEAT_INTERVAL_MS = 30000; // 30 seconds strict heartbeat interval

/**
 * Custom hook quản lý WebSocket kết nối bằng socket.io-client.
 *
 * THUNDERING HERD MITIGATION:
 * - Uses native Full Jitter config:
 *   - reconnectionDelay: 1000ms (base delay)
 *   - reconnectionDelayMax: 5000ms (max backoff delay)
 *   - randomizationFactor: 0.5 (randomizes interval within [0.5 * delay, 1.5 * delay])
 * - Prevents 5,000+ clients from hammering the server at the exact same millisecond upon pod redeploys.
 *
 * REAL-TIME HEARTBEAT:
 * - Sends periodic heartbeats every 30 seconds via sendSocketHeartbeat to refresh Redis TTL.
 */
export function useChatSocket({
  serverUrl = DEFAULT_SERVER_URL,
  userId,
  autoConnect = true,
}: UseChatSocketOptions = {}): UseChatSocketReturn {
  const socketRef = useRef<Socket | null>(null);
  const [socketId, setSocketId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);

  // Only use useEffect for WebSocket connection lifecycle & heartbeat interval
  useEffect(() => {
    if (!autoConnect) return;

    // Initialize socket connection with Jitter algorithms to eliminate Thundering Herd
    const socketInstance: Socket = io(serverUrl, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      randomizationFactor: 0.5,
      autoConnect: true,
      query: userId ? { userId: userId.toString() } : undefined,
    });

    socketRef.current = socketInstance;

    // Socket Event Listeners
    socketInstance.on("connect", async () => {
      const currentSocketId = socketInstance.id;
      setSocketId(currentSocketId || null);
      setIsConnected(true);

      // Immediate initial heartbeat ping upon connection
      if (currentSocketId) {
        try {
          await sendSocketHeartbeat(currentSocketId);
        } catch (err) {
          console.warn("[useChatSocket] Initial heartbeat error:", err);
        }
      }
    });

    socketInstance.on("disconnect", (reason) => {
      setIsConnected(false);
      setSocketId(null);
      console.log("[useChatSocket] Socket disconnected:", reason);
    });

    socketInstance.on("connect_error", (error) => {
      setIsConnected(false);
      console.error("[useChatSocket] Connection error:", error.message);
    });

    // Listen for incoming messages from server/admin
    socketInstance.on("message", (incomingMsg: ChatMessageItem) => {
      setMessages((prev) => [
        ...prev,
        {
          ...incomingMsg,
          isSelf: incomingMsg.senderId === userId,
        },
      ]);
    });

    socketInstance.on("receive_message", (incomingMsg: ChatMessageItem) => {
      setMessages((prev) => [
        ...prev,
        {
          ...incomingMsg,
          isSelf: incomingMsg.senderId === userId,
        },
      ]);
    });

    // ─────────────────────────────────────────────────────────────
    // CRITICAL HEARTBEAT INTERVAL (Every 30 seconds)
    // Prevents Redis 60s TTL expiry and eliminates ghost sessions
    // ─────────────────────────────────────────────────────────────
    const heartbeatInterval = setInterval(async () => {
      const activeId = socketRef.current?.id;
      if (activeId && socketRef.current?.connected) {
        try {
          await sendSocketHeartbeat(activeId);
        } catch (err) {
          console.warn("[useChatSocket] 30s Heartbeat ping failed:", err);
        }
      }
    }, HEARTBEAT_INTERVAL_MS);

    // Teardown cleanup
    return () => {
      clearInterval(heartbeatInterval);
      socketInstance.removeAllListeners();
      socketInstance.disconnect();
      socketRef.current = null;
      setIsConnected(false);
      setSocketId(null);
    };
  }, [serverUrl, userId, autoConnect]);

  // Send message method
  const sendMessage = useCallback(
    (content: string, receiverId = 1) => {
      const cleanContent = content.trim();
      if (!cleanContent) return;

      const newMsg: ChatMessageItem = {
        content: cleanContent,
        senderId: userId,
        receiverId,
        createdAt: new Date().toISOString(),
        isSelf: true,
      };

      // Optimistic local UI update
      setMessages((prev) => [...prev, newMsg]);

      // Emit to server
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.emit("send_message", {
          content: cleanContent,
          receiverId,
          senderId: userId,
        });
      }
    },
    [userId]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    socket: socketRef.current,
    socketId,
    isConnected,
    messages,
    sendMessage,
    clearMessages,
  };
}
