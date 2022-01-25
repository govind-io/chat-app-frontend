import { LoadingButton } from "@mui/lab";
import { Grid, Input, InputAdornment, Paper, Typography } from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { socket } from "../Utils/Connection/SocketConnection";
export default function Login({ setRoomname, setUsername }) {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [showpassword, setshowpassword] = useState("password");
  const [error, seterror] = useState(false);
  const submitLogin = (e) => {
    e.preventDefault();
    setloading(true);
    socket.emit(
      "joinroom",
      {
        userName: e.target.name.value,
        roomName: e.target.room.value,
      },
      (error) => {
        if (error) {
          alert(error);
          setloading(false);
          return seterror(true);
        }
        setRoomname(e.target.room.value);
        setUsername(e.target.name.value);
        e.target.reset();
        setloading(false);
        navigate("/home", {
          userName: e.target.name.value,
          roomName: e.target.room.value,
        });
      }
    );
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      style={{
        minHeight: "90vh",
        maxWidth: "90%",
        margin: "auto",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <Paper elevation={20}>
        <Grid
          item
          xs={12}
          md={6}
          style={{
            textAlign: "center",
            paddingTop: "60px",
            paddingBottom: "30px",
            maxWidth: "500px",
            paddingRight: "10%",
            paddingLeft: "10%",
          }}
        >
          <Typography
            variant="h3"
            style={{
              font: "normal normal 600 30px/37px Montserrat",
            }}
          >
            Login Here
          </Typography>
          <form
            style={{
              marginTop: "50px",
              textAlign: "left",
            }}
            onSubmit={submitLogin}
          >
            <Input
              error={error}
              placeholder="UserName"
              name="name"
              required
              type="text"
              style={{
                width: "100%",
                fontSize: "16px",
              }}
            />

            <Input
              error={error}
              placeholder="Room Name"
              name="room"
              required
              type={showpassword}
              style={{
                width: "100%",
                marginTop: "40px",
                fontSize: "16px",
              }}
              endAdornment={
                <InputAdornment position="start">
                  {showpassword === "password" ? (
                    <VisibilityOffIcon
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setshowpassword("text");
                      }}
                    />
                  ) : (
                    <VisibilityIcon
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setshowpassword("password");
                      }}
                    />
                  )}
                </InputAdornment>
              }
            />
            <LoadingButton
              variant="contained"
              fullWidth
              style={{
                color: "white",
                backgroundColor: "black",
                marginTop: "50px",
                padding: "10px 0px",
                borderRadius: "20px",
              }}
              loadingPosition="end"
              loading={loading}
              type="submit"
            >
              Login
            </LoadingButton>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
}
