import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import vacationReducer from "./slices/vacationSlice";
import locationReducer from "./slices/locationSlice";
import searchReducer from "./slices/searchSlice";
import notiReducer from "./slices/notiSlice";
import albumReducer from "./slices/albumSlice";
import friendReducer from "./slices/friendSlice";
import imageReducer from "./slices/slice";
import resourceReducer from "./slices/resourceSlice";


const rootReducer = {
  auth: authReducer,
  vacation: vacationReducer,
  location: locationReducer,
  search: searchReducer,
  noti: notiReducer,
  album: albumReducer,
  friend: friendReducer,
  image: imageReducer,
  resource: resourceReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
