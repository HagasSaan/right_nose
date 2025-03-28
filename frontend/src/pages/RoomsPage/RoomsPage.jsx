import "./RoomsPage.scss";

import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../Constants";

export default function RoomsPage() {
  const credential = useSelector((state) => state.auth.credential);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const roomsCollection = collection(db, "rooms");

  useEffect(() => {
    async function fetchData() {
      if (!credential) return;
      const roomsSnapshot = await getDocs(roomsCollection);
      setRooms(roomsSnapshot.docs.map((doc) => doc.data()));
    }

    fetchData();
  }, [roomsCollection, credential]);

  if (!credential) {
    return <Navigate to="../auth" />;
  }

  return (
    <div className="rooms-wrapper">
      <div className="rooms-container">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="room-card"
            onClick={() => navigate(`${room.id}`)}
          >
            {room.name}
          </div>
        ))}
        <div
          className="room-card create-room"
          onClick={() => navigate("create")}
        >
          ➕ Create Room
        </div>
      </div>
    </div>
  );
}
