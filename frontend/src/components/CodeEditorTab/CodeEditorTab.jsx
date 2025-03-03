import { useState, useEffect, useContext, useCallback } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";

import "./CodeEditorTab.scss";
import { BASE_URL } from "../../Constants";
import { LanguageContext } from "../../Contexts";

export default function CodeEditorTab({ roomId }) {
  const selectedLanguage = useContext(LanguageContext);
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

  function getExtensions(selectedLanguage) {
    switch (selectedLanguage) {
      case "python":
        console.log("got extension for Python");
        return [python()];
      default:
        console.log("unknown language:", selectedLanguage);
        return [];
    }
  }

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
    await fetch(`http://${BASE_URL}/`, {
      method: "POST",
    });
  };

  return (
    <div className="code-editor-tab">
      <CodeMirror
        className="code-input"
        height="100%"
        value={text}
        extensions={getExtensions(selectedLanguage)} // TODO: it runs for each keyboard input. Needs to be fixed
        onChange={handleTextChange}
      />
      <button onClick={runCode}>Run Code</button>
    </div>
  );
}
