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
        <option value="python3">Python 3</option>;
        <option value="javascript22">JavaScript (Node 22)</option>;
      </select>
    </div>
  );
}
