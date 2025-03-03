'use client';

import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const useWebSocket = () => {
  type WebSocketMessage = { message: string };

  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const ws = io("http://localhost:4009");
    setSocket(ws);

    ws.on("userId", (id: number) => {
      setUserId(id);
    });

    ws.on("notification", (data: string) => {
      console.log("Received notification:", data); 
      setMessages((prev) => [...prev, { message: data }]);
    });

    return () => {
      ws.disconnect();
    };
  }, []);

  return { messages, userId, socket };
};

export default useWebSocket;
