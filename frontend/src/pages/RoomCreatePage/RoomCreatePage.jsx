import { v4 as uuidv4 } from "uuid";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../../Constants";
import "./RoomCreatePage.scss";

export default function RoomCreatePage() {
  const roomsCollection = collection(db, "rooms");
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");

  async function createRoom() {
    if (!roomName.trim()) {
      setError("Room name cannot be empty");
      return;
    }

    const roomData = {
      id: uuidv4(),
      name: roomName,
    };

    try {
      await addDoc(roomsCollection, roomData);
      navigate("../rooms");
    } catch (err) {
      setError("Something went wrong. Try again.");
      console.error(err);
    }
  }

  return (
    <div className="room-create-container">
      <div className="room-create-card">
        <h1>Create a New Room</h1>
        <input
          type="text"
          placeholder="Enter room name"
          value={roomName}
          onChange={(e) => {
            setRoomName(e.target.value);
            setError("");
          }}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={createRoom}>Create Room</button>
      </div>
    </div>
  );
}