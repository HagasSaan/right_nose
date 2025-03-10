import "./CodeEditor.scss";

import CodeEditorTab from "../CodeEditorTab/CodeEditorTab";
import CodeOutputTab from "../CodeOutputTab/CodeOutputTab";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

export default function CodeEditor({ roomId }) {
  return (
    <div className="editor-container">
      <LanguageSelector />
      <div className="editor-tabs">
        <CodeEditorTab roomId={roomId} />
        <CodeOutputTab roomId={roomId} />
      </div>
    </div>
  );
}
