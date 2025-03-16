import "./App.scss";

import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import RoomPage from "./pages/RoomPage/RoomPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import RoomCreatePage from "./pages/RoomCreatePage/RoomCreatePage";

export default function App() {
  return (
    <Routes>
      <Route path="" end element={<HomePage />}>
        <Route path="auth" element={<AuthPage />} />
        <Route path="rooms" element={<RoomsPage />} />
        <Route path="rooms/create" element={<RoomCreatePage />} />
        <Route path="rooms/:roomId" element={<RoomPage />} />
      </Route>
    </Routes>
  );
}
