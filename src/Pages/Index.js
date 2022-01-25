import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
import Sidebar from "./Sidebar";
export default function MainPage({ userName, roomName }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!userName) {
      alert("Please choose a username");
      navigate("/join");
    } else if (!roomName) {
      alert("Please choose a room name");
      navigate("/join");
    }
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          width: "20%",
        }}
      >
        <Sidebar />
      </div>
      <HomePage userName={userName} roomName={roomName} />
    </div>
  );
}
