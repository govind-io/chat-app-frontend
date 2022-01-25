import { Suspense, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "../AuthPage/Login";
import ErrorPage from "../Components/Error Page/404";
import MainPage from "../Pages/Index";

function App() {
  const [userName, setUsername] = useState();
  const [roomName, setRoomname] = useState();
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="" element={<Navigate to="/join" />} />
            <Route
              path="/join"
              element={
                <Login setRoomname={setRoomname} setUsername={setUsername} />
              }
            />
            <Route
              path="/home"
              element={<MainPage roomName={roomName} userName={userName} />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
