import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import vacationReducer from "./slices/vacationSlice";

const rootReducer = {
  auth: authReducer,
  vacation: vacationReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
