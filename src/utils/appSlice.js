import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  // authChecked stays false until Firebase's onAuthStateChanged fires for the
  // first time, so we know whether `user` being null means "logged out" or
  // just "not resolved yet".
  initialState: { authChecked: false },
  reducers: {
    setAuthChecked: (state) => {
      state.authChecked = true;
    },
  },
});

export const { setAuthChecked } = appSlice.actions;

export default appSlice.reducer;
