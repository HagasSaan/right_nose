import { useState } from "react";
import { LanguageContext } from "../../Contexts";

export default function LanguageSelector({ children }) {
  const [selectedLanguage, setSelectedLanguage] = useState("python");

  return (
    <LanguageContext.Provider value={selectedLanguage}>
      <div className="language-selector">
        <select
          id="selected-language"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="python">Python</option>;
          <option value="javascript">JavaScript</option>;
        </select>
      </div>
      {children}
    </LanguageContext.Provider>
  );
}
