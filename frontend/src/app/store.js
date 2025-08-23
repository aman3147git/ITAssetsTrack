import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import requestReducer from "../features/requestSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    requests: requestReducer,
  },
});
