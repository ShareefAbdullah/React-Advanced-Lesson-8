const initialState = {
    albums: [],
    isAlbumsLoading: false
};

export const albums = (state = initialState, action) => {
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

        
        default:
            return state;
    }
}