const initialState = {
    albums: [],
    photos: [],
    selectedAlbumId: null,
    searchFilter: "",
    isAlbumsLoading: false,
    isPhotosLoading: false
};

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "albums/load/pending":
            return {
                ...state,
                isAlbumsLoading: true
            }
        case "albums/load/fulfilled":
            return {
                ...state,
                isAlbumsLoading: false,
                albums: action.payload
            }
        case "photos/load/pending":
            return {
                ...state,
                isPhotosLoading: true
            }
        case "photos/load/fulfilled":
            return {
                ...state,
                isPhotosLoading: false,
                photos: action.payload
            }
        case "select/albumId":
            return {
                ...state,
                selectedAlbumId: action.payload
            }
        case "search/text":
            return {
                ...state,
                searchFilter: action.payload
            }
        default:
            return state;
    }
};