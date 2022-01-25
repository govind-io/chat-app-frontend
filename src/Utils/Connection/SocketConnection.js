import { io } from "socket.io-client";

export const socket = io(
  "https://git.heroku.com/chat-app-backend-mindrops.git",
  {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  }
);

socket.on("connect", () => {
  console.log("new socket is connected");
});
