import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  // authChecked stays false until Firebase's onAuthStateChanged fires for the
  // first time, so we know whether `user` being null means "logged out" or
  // just "not resolved yet".
  initialState: { authChecked: false, gptSearchView: false },
  reducers: {
    setAuthChecked: (state) => {
      state.authChecked = true;
    },
    // Toggles the /browse page between the normal movie rows and GPT search.
    toggleGptSearchView: (state) => {
      state.gptSearchView = !state.gptSearchView;
    },
  },
});

export const { setAuthChecked, toggleGptSearchView } = appSlice.actions;

export default appSlice.reducer;
