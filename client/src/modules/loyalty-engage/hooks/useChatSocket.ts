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

const HEARTBEAT_INTERVAL_MS = 30000;

export function useChatSocket({
  serverUrl = DEFAULT_SERVER_URL,
  userId,
  autoConnect = true,
}: UseChatSocketOptions = {}): UseChatSocketReturn {
  const socketRef = useRef<Socket | null>(null);
  const [socketId, setSocketId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);

  useEffect(() => {
    if (!autoConnect) return;

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

    socketInstance.on("connect", async () => {
      const currentSocketId = socketInstance.id;
      setSocketId(currentSocketId || null);
      setIsConnected(true);

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

    return () => {
      clearInterval(heartbeatInterval);
      socketInstance.removeAllListeners();
      socketInstance.disconnect();
      socketRef.current = null;
      setIsConnected(false);
      setSocketId(null);
    };
  }, [serverUrl, userId, autoConnect]);

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

      setMessages((prev) => [...prev, newMsg]);

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
