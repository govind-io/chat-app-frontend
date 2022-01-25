import { io } from "socket.io-client";

export const socket = io("http://localhost:3001", {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("new socket is connected");
});
