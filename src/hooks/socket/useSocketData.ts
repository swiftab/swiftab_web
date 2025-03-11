// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3002", {
//   withCredentials: true,
//   transports: ["websocket"],
// });

// const useSocketData = (event: string) => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     socket.on(event, (newData) => {
//       setData(newData);
//     });

//     return () => {
//       socket.off(event);
//     };
//   }, [event]);

//   return data;
// };

// export default useSocketData;

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(
  process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3002",
  { withCredentials: true }
);

const useSocketData = (event: string) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    socket.on("connect", () => console.log("WebSocket connected"));
    socket.on("connect_error", (err) => console.log("WebSocket error:", err.message));
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
