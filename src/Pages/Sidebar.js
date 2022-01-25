import { Grid, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { socket } from "../Utils/Connection/SocketConnection";

export default function Sidebar() {
  const [roomname, setroomname] = useState("loading...");
  const [userlist, setuserlist] = useState(["loading..."]);
  const containerref = useRef();
  useEffect(() => {
    socket.on("roomdata", ({ roomname, userlist }) => {
      setroomname(roomname);
      let temp = userlist.map((user) => user.userName);
      setuserlist(temp);
    });
  }, []);

  useEffect(() => {
    containerref.current.scrollTop = containerref.current.scrollHeight;
  }, [userlist]);

  return (
    <Grid
      container
      style={{
        padding: "50px",
        height: "100vh",
        overflowY: "auto",
      }}
      ref={containerref}
    >
      <Grid item>
        <Typography variant={"h6"}>
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            Room Name:
          </span>{" "}
          {roomname}
        </Typography>
        <Typography
          variant={"h6"}
          style={{
            fontWeight: "bold",
            marginTop: "20px",
          }}
        >
          Active users:
        </Typography>

        {userlist.map((user) => {
          return (
            <Typography
              stle={{
                marginTop: "10px",
              }}
            >
              {user}
            </Typography>
          );
        })}
      </Grid>
    </Grid>
  );
}
