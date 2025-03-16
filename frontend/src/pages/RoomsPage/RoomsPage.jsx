import "./RoomsPage.scss";

import { useState, useEffect } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";

import { BASE_URL, db } from "../../Constants";

export default function RoomsPage() {
  const credential = useSelector((state) => state.auth.credential);
  const [rooms, setRooms] = useState([]);

  const roomsCollection = collection(db, "rooms");

  useEffect(() => {
    async function fetchData() {
      if (!credential) {
        return;
      }
      const roomsSnapshot = await getDocs(roomsCollection);
      setRooms(roomsSnapshot.docs.map((doc) => doc.data()));
    }

    fetchData();
  }, [roomsCollection, credential]);

  if (!credential) {
    return <Navigate to="../auth" />;
  }

  return (
    <>
      <nav className="rooms-nav">
        {rooms.map((room) => (
          <NavLink key={room.id} to={`${room.id}`}>
            Room {room.name}
          </NavLink>
        ))}
        <NavLink to="create">Create Room</NavLink>
      </nav>
    </>
  );
}
