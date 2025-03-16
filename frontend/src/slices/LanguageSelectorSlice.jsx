import { createSlice } from "@reduxjs/toolkit";

export const languageSelectorSlice = createSlice({
  name: "languageSelector",
  initialState: {
    value: "python3",
  },
  reducers: {
    selectLanguage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { selectLanguage } = languageSelectorSlice.actions;
export default languageSelectorSlice.reducer;
