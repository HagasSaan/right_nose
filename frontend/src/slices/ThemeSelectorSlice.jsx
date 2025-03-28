import { createSlice } from "@reduxjs/toolkit";

export const themeSelectorSlice = createSlice({
  name: "themeSelector",
  initialState: {
    value: "light",
  },
  reducers: {
    selectTheme: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { selectTheme } = themeSelectorSlice.actions;
export default themeSelectorSlice.reducer;
