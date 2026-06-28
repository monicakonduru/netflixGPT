import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import appReducer from "./appSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
  },
});

export default appStore;
