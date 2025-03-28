import { configureStore } from "@reduxjs/toolkit";
import languageSelectorReducer from "./slices/LanguageSelectorSlice";
import themeSelectorReducer from "./slices/ThemeSelectorSlice";
import authReducer from "./slices/AuthSlice";

const store = configureStore({
  reducer: {
    languageSelector: languageSelectorReducer,
    themeSelector: themeSelectorReducer,
    auth: authReducer,
  },
});

export default store;
