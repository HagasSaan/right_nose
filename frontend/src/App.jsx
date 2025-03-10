import "./App.scss";

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import RoomPage from "./pages/RoomPage/RoomPage";

export default function App() {
  return (
    <Routes>
      <Route path="" end element={<HomePage />}>
        <Route path="rooms" element={<RoomsPage />}></Route>
        <Route path="rooms/:roomId" element={<RoomPage />} />
      </Route>
    </Routes>
  );
}
