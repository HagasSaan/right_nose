import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";

import "./CodeEditorTab.scss";
import { BASE_URL } from "../../Constants";

export default function CodeEditorTab({ roomId }) {
  const selectedLanguage = useSelector((state) => state.languageSelector.value);
  const [ws, setWs] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const websocketUrl = `ws://${BASE_URL}/ws/${roomId}/input`;
    console.log("Connecting to socket", websocketUrl);

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

    setWs(websocket);
    return () => {
      websocket.close();
    };
  }, [roomId]);

  const extensions = useMemo(() => {
    switch (selectedLanguage) {
      case "python":
        console.log("got extension for Python");
        return [python()];
      case "javascript":
        console.log("got extension for JavaScript");
        return [javascript()];
      default:
        console.log("unknown language:", selectedLanguage);
        return [];
    }
  }, [selectedLanguage]);

  const handleTextChange = useCallback(
    (value) => {
      setText(value);
      if (ws) {
        ws.send(value);
      }
    },
    [ws],
  );

  const runCode = async () => {
    console.log("running code");
    await fetch(
      `http://${BASE_URL}/api/rooms/${roomId}?language=${selectedLanguage}`,
      {
        method: "POST",
      },
    );
  };

  return (
    <div className="code-editor-tab">
      <CodeMirror
        className="code-input"
        height="100%"
        value={text}
        extensions={extensions}
        onChange={handleTextChange}
      />
      <button onClick={runCode}>Run Code</button>
    </div>
  );
}
