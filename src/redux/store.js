import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import appointmentSlice from "./slices/appointmentSlice";


export const store = configureStore({
  reducer: {
    user:userSlice,
    appointment:appointmentSlice

 
  },
});
