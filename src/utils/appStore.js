import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import appReducer from "./appSlice";
import moviesReducer from "./moviesSlice";
import gptReducer from "./gptSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    movies: moviesReducer,
    gpt: gptReducer,
  },
});

export default appStore;
