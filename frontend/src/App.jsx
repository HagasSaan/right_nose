import { useEffect } from "react";
import "./App.scss";

import CodeEditor from "./components/CodeEditor/CodeEditor";
import { BASE_URL } from "./Constants";
import { useState } from "react";

export default function App() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function getRoomsFromAPI() {
      let response = await fetch(`http://${BASE_URL}/api/rooms`);

      let json = await response.json();
      setRooms(json);
    }

    getRoomsFromAPI();
  }, []);

  return <CodeEditor roomId={1} />;
}
