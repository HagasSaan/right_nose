import { configureStore } from "@reduxjs/toolkit";
import languageSelectorReducer from "./LanguageSelectorSlice";

export default configureStore({
  reducer: {
    languageSelector: languageSelectorReducer,
  },
});
