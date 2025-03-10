import "./LanguageSelector.scss";

import { useDispatch, useSelector } from "react-redux";
import { selectLanguage } from "../../LanguageSelectorSlice";

export default function LanguageSelector() {
  const selectedLanguage = useSelector((state) => state.languageSelector.value);
  const dispatch = useDispatch();

  return (
    <div className="language-selector">
      <select
        id="selected-language"
        value={selectedLanguage}
        onChange={(e) => dispatch(selectLanguage(e.target.value))}
      >
        <option value="python">Python</option>;
        <option value="javascript">JavaScript (Node 22)</option>;
      </select>
    </div>
  );
}
