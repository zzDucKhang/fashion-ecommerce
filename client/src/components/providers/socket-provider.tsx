'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';
    if (typeof window !== 'undefined' && window.location.protocol === 'https:' && socketUrl.startsWith('http://') && !socketUrl.includes('localhost') && !socketUrl.includes('127.0.0.1')) {
      socketUrl = socketUrl.replace('http://', 'https://');
    }

    const socketInstance = io(socketUrl, {
      autoConnect: false,
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
      reconnectionDelayMax: 10000,
      timeout: 20000,
    });

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    const syncAuthentication = () => {
      const token = localStorage.getItem('accessToken');
      socketInstance.auth = { token };
      if (token) {
        if (!socketInstance.connected) socketInstance.connect();
      } else {
        socketInstance.disconnect();
      }
    };

    socketInstance.on('connect', onConnect);
    socketInstance.on('disconnect', onDisconnect);
    window.addEventListener('storage', syncAuthentication);
    window.addEventListener('local-storage-change', syncAuthentication);
    syncAuthentication();
    const timer = setTimeout(() => setSocket(socketInstance), 0);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('storage', syncAuthentication);
      window.removeEventListener('local-storage-change', syncAuthentication);
      socketInstance.off('connect', onConnect);
      socketInstance.off('disconnect', onDisconnect);
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);