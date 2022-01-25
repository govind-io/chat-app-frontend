import { Button, Input, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { useEffect, useMemo, useState, useRef } from "react";
import { socket } from "../Utils/Connection/SocketConnection";
export default function HomePage({ userName, roomName }) {
  const [connected, setconnected] = useState(true);
  const [messages, setmessages] = useState([]);
  const messagesref = useRef();
  const containerref = useRef();
  messagesref.current = messages;
  const acknowledgment = (error, msg) => {
    if (error) {
      return alert(error);
    }
    setconnected(true);
    containerref.current.scrollTop = containerref.current.scrollHeight;
    console.log("Server responded with " + msg);
  };

  const sendlocation = () => {
    if (navigator.geolocation) {
      setconnected(false);
      navigator.geolocation.getCurrentPosition((position) => {
        socket.emit(
          "sendLocation",
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          acknowledgment
        );
      });
      return;
    }
    alert("sending location is not supported by your browser");
  };

  const sendMessage = (e) => {
    e.preventDefault();
    setconnected(false);
    socket.emit("sendMessage", e.target.msg.value, acknowledgment);
    e.target.msg.value = "";
  };

  function updatemessageArray(msg, timestamp, username) {
    const temp = [...messagesref.current];
    temp.push({
      message: msg,
      timestamp: moment(timestamp).format("hh:mm a"),
      username,
    });
    setmessages(temp);
  }

  const showMessages = useMemo(() => {
    return messages.map((element, index) => {
      return (
        <Grid
          item
          xs={12}
          style={{
            marginTop: "20px",
          }}
          key={index}
        >
          <Typography
            variant="h5"
            style={{
              fontWeight: "Bold",
            }}
          >
            {element.username} -
            <span
              style={{
                fontWeight: "normal",
              }}
            >
              {" " + element.timestamp}
            </span>
          </Typography>
          <Typography
            variant="h6"
            style={{
              marginTop: "5px",
              fontWeight: "normal",
            }}
          >
            {element.message}
          </Typography>
        </Grid>
      );
    });
  }, [messages]);

  useEffect(() => {
    socket.on("connected", (data) => {
      updatemessageArray(data.text, data.timestamp, data.userName);
    });

    socket.on("message", (data) => {
      updatemessageArray(data.text, data.timestamp, data.userName);
    });

    socket.on("location", (data) => {
      updatemessageArray(
        <a target="_blank" href={data.text}>
          My current location is
        </a>,
        data.timestamp,
        data.userName
      );
    });
  }, []);

  return (
    <Grid container width="80%">
      <Box
        ref={containerref}
        style={{
          height: "calc(100vh - 161px)",
          overflowY: "auto",
          padding: "0px 100px 20px 100px",
          width: "100%",
        }}
      >
        <Box
          style={{
            display: "flex",
            minHeight: "calc(100vh - 181px)",
            justifyContent: "flex-start",
            alignItems: "flex-end",
          }}
        >
          <Grid container>{showMessages}</Grid>
        </Box>
      </Box>
      <form
        onSubmit={sendMessage}
        style={{
          width: "100%",
        }}
      >
        <Grid container justifyContent={"center"} alignItems={"flex-end"}>
          <Paper
            elevation={5}
            style={{
              width: "100%",
            }}
          >
            <Grid
              item
              xs={6}
              sm={12}
              style={{
                width: "100%",
                padding: "50px 100px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
              }}
            >
              <Input
                placeholder="Message"
                type="text"
                name="msg"
                required
                disabled={!connected}
                style={{
                  width: "70%",
                }}
              />
              <Button
                variant="contained"
                style={{
                  backgroundColor: "black",
                  color: "white",

                  fontWeight: "500",
                  fontSize: "0.875rem",
                  lineHeight: " 1.75",
                  width: "10%",
                }}
                disabled={!connected}
                type="submit"
              >
                Send Message
              </Button>
              <Box
                style={{
                  width: "fit-content",
                  padding: "6px 16px",
                  backgroundColor: "black",
                  color: "white",
                  fontWeight: "500",
                  fontSize: "0.875rem",
                  lineHeight: " 1.75",
                  cursor: "pointer",
                  width: "10%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  if (connected) {
                    sendlocation();
                  }
                }}
              >
                Send Location
              </Box>
            </Grid>
          </Paper>
        </Grid>
      </form>
    </Grid>
  );
}
