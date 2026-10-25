import { ActionTypes, PhotosType } from "../actions";

type InitialStateType = {
  photos: PhotosType[];
  searchFilter: string;
  isPhotosLoading: boolean;
  error: null | string;
};

const initialState: InitialStateType = {
  photos: [],
  searchFilter: "",
  isPhotosLoading: false,
  error: null,
};

export const photos = (
  state = initialState,
  action: ActionTypes
): InitialStateType => {
  switch (action.type) {
    case "photos/load/pending":
      return {
        ...state,
        isPhotosLoading: true,
        error: null,
      };
    case "photos/load/fulfilled":
      return {
        ...state,
        isPhotosLoading: false,
        photos: action.payload,
      };
    case "photos/load/rejected":
      return {
        ...state,
        isPhotosLoading: false,
        error: action.payload,
      };
    case "search/text":
      return {
        ...state,
        searchFilter: action.payload,
      };

    default:
      return state;
  }
};
