import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import { thunk } from "redux-thunk";
import { albums } from "./albums/albums";
import { photos } from "./photos/photos";

const logger = createLogger({
  diff: true,
  collapsed: true,
});

const rootState = combineReducers({
  albums: albums,
  photos: photos,
});
// @ts-ignore
export const store = createStore(rootState, applyMiddleware(thunk, logger));

export type RootState = ReturnType<typeof rootState>;
export type AppDispatch = typeof store.dispatch;
