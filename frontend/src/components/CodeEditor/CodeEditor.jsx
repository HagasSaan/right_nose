import CodeEditorTab from "../CodeEditorTab/CodeEditorTab";
import CodeOutputTab from "../CodeOutputTab/CodeOutputTab";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

export default function CodeEditor({ roomId }) {
  return (
    <div className="editor-container">
      <LanguageSelector>
        <CodeEditorTab roomId={roomId} />
        <CodeOutputTab roomId={roomId} />
      </LanguageSelector>
    </div>
  );
}
