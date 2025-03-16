import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";

import "./CodeEditorTab.scss";
import { BASE_URL } from "../../Constants";
import { selectLanguage } from "../../slices/LanguageSelectorSlice";

export default function CodeEditorTab({ roomId }) {
  const selectedLanguage = useSelector((state) => state.languageSelector.value);
  const dispatch = useDispatch();
  const [ws, setWs] = useState(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    const websocketUrl = `ws://${BASE_URL}/ws/${roomId}/input`;
    console.debug("Connecting to socket", websocketUrl);

    const websocket = new WebSocket(websocketUrl);
    websocket.onopen = () => {
      console.debug("Connected to websocket", websocketUrl);
    };

    websocket.onclose = () => {
      console.debug("Closed connection with websocket", websocketUrl);
    };

    websocket.onmessage = (event) => {
      let message = JSON.parse(event.data);
      setCode(message.code);
      dispatch(selectLanguage(message.language));
    };

    setWs(websocket);
    return () => {
      websocket.close();
    };
  }, [roomId, dispatch]);

  const extensions = useMemo(() => {
    let message = {
      code: code,
      language: selectedLanguage,
    };
    if (ws) {
      ws.send(JSON.stringify(message));
    }

    switch (selectedLanguage) {
      case "python3":
        console.debug("got extension for Python");
        return [python()];
      case "javascript22":
        console.debug("got extension for JavaScript");
        return [javascript()];
      default:
        console.debug("unknown language:", selectedLanguage);
        return [];
    }
  }, [selectedLanguage]);

  const handleTextChange = useCallback(
    (value) => {
      setCode(value);
      let message = { code: value, language: selectedLanguage };
      if (ws) {
        ws.send(JSON.stringify(message));
      }
    },
    [ws, selectedLanguage],
  );

  const runCode = async () => {
    console.log("running code");
    await fetch(`http://${BASE_URL}/api/rooms/${roomId}`, {
      method: "POST",
    });
  };

  return (
    <div className="code-editor-tab">
      <CodeMirror
        className="code-input"
        height="100%"
        value={code}
        extensions={extensions}
        onChange={handleTextChange}
      />
      <button onClick={runCode}>Run Code</button>
    </div>
  );
}
