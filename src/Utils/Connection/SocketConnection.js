import { io } from "socket.io-client";

export const socket = io("https://chat-app-backend-mindrops.herokuapp.com/", {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("new socket is connected");
});
