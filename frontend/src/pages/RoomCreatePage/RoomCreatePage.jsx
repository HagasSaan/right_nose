import { v4 as uuidv4 } from "uuid";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../../Constants";

export default function RoomCreatePage() {
  const roomsCollection = collection(db, "rooms");
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");

  async function createRoom() {
    if (!roomName) {
      return;
    }

    const roomData = {
      id: uuidv4(),
      name: roomName,
    };

    await addDoc(roomsCollection, roomData);
    navigate("../rooms");
  }

  return (
    <>
      <label>
        <input
          onChange={(e) => setRoomName(e.target.value)}
          value={roomName}
        ></input>
      </label>
      <button onClick={createRoom}>Create Room</button>);
    </>
  );
}
