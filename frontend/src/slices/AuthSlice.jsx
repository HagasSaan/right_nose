import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    credential: null,
  },
  reducers: {
    setCredential: (state, action) => {
      state.credential = action.payload;
    },
  },
});

export const { setCredential } = authSlice.actions;
export default authSlice.reducer;
