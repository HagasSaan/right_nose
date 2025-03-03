import { useState } from "react";
import { useEffect } from "react";
import "./CodeOutputTab.scss";
import { BASE_URL } from "../../Constants";

export default function CodeOutputTab({ roomId }) {
  const [text, setText] = useState("");

  useEffect(() => {
    const websocketUrl = `ws://${BASE_URL}/ws/${roomId}/output`;
    const websocket = new WebSocket(websocketUrl);
    websocket.onopen = () => {
      console.log("Connected to websocket", websocketUrl);
    };

    websocket.onclose = () => {
      console.log("Closed connection with websocket", websocketUrl);
    };

    websocket.onmessage = (event) => {
      setText(event.data);
    };

    return () => {
      websocket.close();
    };
  }, [roomId]);

  return (
    <div className="code-editor-tab">
      <textarea
        className="code-output"
        value={text}
        rows={10}
        cols={50}
        readOnly
      />
    </div>
  );
}
