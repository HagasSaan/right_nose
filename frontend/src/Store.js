import { configureStore } from "@reduxjs/toolkit";
import languageSelectorReducer from "./slices/LanguageSelectorSlice";
import authReducer from "./slices/AuthSlice";

const store = configureStore({
  reducer: {
    languageSelector: languageSelectorReducer,
    auth: authReducer,
  },
});

export default store;
