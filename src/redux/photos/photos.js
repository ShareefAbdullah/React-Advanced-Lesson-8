const initialState = {
  photos: [],
  searchFilter: "",
  isPhotosLoading: false,
};

export const photos = (state = initialState, action) => {
  switch (action.type) {
    case "photos/load/pending":
      return {
        ...state,
        isPhotosLoading: true,
      };
    case "photos/load/fulfilled":
      return {
        ...state,
        isPhotosLoading: false,
        photos: action.payload,
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
