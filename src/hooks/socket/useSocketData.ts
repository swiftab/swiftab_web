import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3002", {
  withCredentials: true,
  transports: ["websocket"],
});

const useSocketData = (event: string) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    socket.on(event, (newData) => {
      setData(newData);
    });

    return () => {
      socket.off(event);
    };
  }, [event]);

  return data;
};

export default useSocketData;
