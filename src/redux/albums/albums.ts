import { ActionTypes, AlbumsType } from "../actions";

type InitialStateType = {
  albums: AlbumsType[];
  isAlbumsLoading: boolean;
  error: null | string;
};

const initialState: InitialStateType = {
  albums: [],
  isAlbumsLoading: false,
  error: null,
};

export const albums = (
  state = initialState,
  action: ActionTypes
): InitialStateType => {
  switch (action.type) {
    case "albums/load/pending":
      return {
        ...state,
        isAlbumsLoading: true,
        error: null,
      };
    case "albums/load/fulfilled":
      return {
        ...state,
        isAlbumsLoading: false,
        albums: action.payload,
      };
    case "albums/load/rejected":
      return {
        ...state,
        isAlbumsLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
