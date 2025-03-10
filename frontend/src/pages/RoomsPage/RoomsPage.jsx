import "./RoomsPage.scss";

import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { BASE_URL } from "../../Constants";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(`http://${BASE_URL}/api/rooms`);
      let roomsJson = await response.json();
      setRooms(roomsJson);
    }

    fetchData();
  }, []);

  return (
    <>
      <nav className="rooms-nav">
        {rooms.map((room) => (
          <NavLink key={room.id} to={`${room.id}`}>
            Room {room.name}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
