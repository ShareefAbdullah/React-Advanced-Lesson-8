import { AppDispatch } from ".";

export type AlbumsType = {
  userId: number;
  id: number;
  title: string;
};

export type PhotosType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type ActionTypes =
  | { type: "albums/load/pending" }
  | { type: "albums/load/fulfilled"; payload: AlbumsType[] }
  | { type: "albums/load/rejected"; payload: string }
  | { type: "photos/load/pending" }
  | { type: "photos/load/fulfilled"; payload: PhotosType[] }
  | { type: "photos/load/rejected"; payload: string }
  | { type: "search/text"; payload: string };

export const loadAlbums = () => {
  return (dispatch: AppDispatch): void => {
    dispatch({ type: "albums/load/pending" });

    fetch("https://jsonplaceholder.typicode.com/albums?_limit=10")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch albums");
        }
        return response.json();
      })
      .then((json: AlbumsType[]) => {
        dispatch({
          type: "albums/load/fulfilled",
          payload: json,
        });
      })
      .catch((error: Error) => {
        dispatch({
          type: "albums/load/rejected",
          payload: error.message,
        });
      });
  };
};

export const loadPhotos = (id: number) => {
  return (dispatch: AppDispatch): void => {
    dispatch({ type: "photos/load/pending" });

    fetch(`https://jsonplaceholder.typicode.com/photos/?albumId=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }
        return response.json();
      })
      .then((json: PhotosType[]) => {
        dispatch({
          type: "photos/load/fulfilled",
          payload: json,
        });
      })
      .catch((error: Error) => {
        dispatch({
          type: "photos/load/rejected",
          payload: error.message,
        });
      });
  };
};

export const setSearchFilter = (text: string) => {
  return {
    type: "search/text",
    payload: text,
  };
};
