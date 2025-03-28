import "./App.scss";

import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import RoomPage from "./pages/RoomPage/RoomPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import LogoutPage from "./pages/LogoutPage/LogoutPage";
import RoomCreatePage from "./pages/RoomCreatePage/RoomCreatePage";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="logout" element={<LogoutPage />} />
        <Route path="rooms" element={<RoomsPage />} />
        <Route path="rooms/create" element={<RoomCreatePage />} />
        <Route path="rooms/:roomId" element={<RoomPage />} />
      </Route>
    </Routes>
  );
}
