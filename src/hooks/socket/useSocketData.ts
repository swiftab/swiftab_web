import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Use environment variable for flexibility
const SOCKET_URL =
  process.env.NEXT_PUBLIC_WS_URL ||
  "wss://server-production-2ee7.up.railway.app";

const socket = io(SOCKET_URL, {
  withCredentials: true, // Send cookies (token)
  // Remove transports: ["websocket"] to allow polling fallback if needed
});

interface TableStatus {
  activeTables: number | null; 
  totalTables: number;
}

interface WebSocketData {
  reservations: number;
  revenue: number;
  tableStatus: TableStatus;
  totalCustomers: number;
}

const useSocketData = (event: string) => {
  //const [data, setData] = useState(null);
  const [data, setData] = useState<WebSocketData>({
    reservations: 0,
    revenue: 0,
    tableStatus: { activeTables: 0, totalTables: 0 },
    totalCustomers: 0,
  });
  

  useEffect(() => {
    socket.on("connect", () =>
      console.log("WebSocket connected to", SOCKET_URL)
    );
    socket.on("connect_error", (err) =>
      console.log("WebSocket error:", err.message)
    );
    socket.on(event, (newData) => {
      console.log("Received data:", newData);
      setData(newData);
    });

    return () => {
      socket.off(event);
      socket.off("connect");
      socket.off("connect_error");
    };
  }, [event]);

  return data;
};

export default useSocketData;
