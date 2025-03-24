import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { githubLight } from "@uiw/codemirror-theme-github";

import "./CodeEditorTab.scss";
import { BASE_URL } from "../../Constants";
import { selectLanguage } from "../../slices/LanguageSelectorSlice";

export default function CodeEditorTab({ roomId }) {
  const selectedLanguage = useSelector((state) => state.languageSelector.value);
  const dispatch = useDispatch();
  const [ws, setWs] = useState(null);
  const [code, setCode] = useState("");

  const [theme, setTheme] = useState(() =>
    document.documentElement.getAttribute("data-theme") || "light"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute("data-theme");
      setTheme(newTheme || "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  // WebSocket
  useEffect(() => {
    const websocketUrl = `ws://${BASE_URL}/ws/${roomId}/input`;
    const websocket = new WebSocket(websocketUrl);

    websocket.onopen = () => console.debug("Connected to WebSocket", websocketUrl);
    websocket.onclose = () => console.debug("Disconnected from WebSocket", websocketUrl);
    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setCode(message.code);
      dispatch(selectLanguage(message.language));
    };

    setWs(websocket);
    return () => websocket.close();
  }, [roomId, dispatch]);

  useEffect(() => {
    if (ws && code !== "") {
      ws.send(JSON.stringify({ code, language: selectedLanguage }));
    }
  }, [code, selectedLanguage, ws]);

  const extensions = useMemo(() => {
    switch (selectedLanguage) {
      case "python3":
        return [python()];
      case "javascript22":
        return [javascript()];
      default:
        return [];
    }
  }, [selectedLanguage]);

  const handleTextChange = useCallback(
    (value) => {
      setCode(value);
    },
    []
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
        theme={theme === "dark" ? oneDark : githubLight} 
        extensions={extensions}
        onChange={handleTextChange}
      />
      <button onClick={runCode}>Run Code</button>
    </div>
  );
}
