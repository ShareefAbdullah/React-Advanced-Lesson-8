import { configureStore } from "@reduxjs/toolkit";
import albumsReducer from "./albums/albumsSlice";
import photosReducer from "./photos/photosSlice";

export const store = configureStore({
  reducer: {
    albums: albumsReducer,
    photos: photosReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
