export const loadAlbums = () => {
    return (dispatch) => {
        dispatch({type: "albums/load/pending"});

        fetch("https://jsonplaceholder.typicode.com/albums?_limit=10")
            .then((response) => response.json())
            .then((json) => {
                dispatch({
                    type: "albums/load/fulfilled",
                    payload: json
                });
            });
            
    }
}

export const loadPhotos = () => {
    return (dispatch) => {
        dispatch({type: "photos/load/pending"});

        fetch("https://jsonplaceholder.typicode.com/photos?_limit=500")
            .then((response) => response.json())
            .then((json) => {
                dispatch({
                    type: "photos/load/fulfilled",
                    payload: json
                });
            });
    }
}

export const selectId = (albumId) => {
    return {
        type: "select/albumId",
        payload: albumId
    }
}

export const setSearchFilter = (text) => {
    return {
        type: "search/text",
        payload: text
    }
}