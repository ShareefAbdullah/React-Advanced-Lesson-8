import { setSearchFilter } from "../redux/photos/photosSlice";
import { useParams } from "react-router-dom";
import { ChangeEvent, useEffect } from "react";
import styles from "./photos.module.scss";
import { loadPhotos } from "../redux/photos/photosSlice";
import { useTypedDispatch, useTypedSelector } from "../redux/hooks";

export const Photos = () => {
  const dispatch = useTypedDispatch();
  const photos = useTypedSelector((state) => state.photos.photos);
  const searchFilter = useTypedSelector((state) => state.photos.searchFilter);
  const isPhotosLoading = useTypedSelector(
    (state) => state.photos.isPhotosLoading
  );
  const isError = useTypedSelector((state) => state.photos.error);
  const { id } = useParams<{ id: string }>();
  const numberId = Number(id);

  const selectedPhotos = photos
    .filter((photo) => photo.albumId === numberId)
    .filter((photo) => photo.title.indexOf(searchFilter) > -1);

  useEffect(() => {
    if (id) {
      dispatch(loadPhotos(id));
    }
  }, [id]);

  if (isNaN(numberId)) {
    return (
      <h3 className={styles["no-selected-album"]}>
        <span>←</span> Select an Album
      </h3>
    );
  }

  if (isPhotosLoading) {
    return (
      <h3 className={styles["loading-selected-photos"]}>
        Loading the photos...
      </h3>
    );
  }

  if (isError) {
    return <h3 className={styles["photos-error"]}>Failed to load photos.</h3>;
  }

  const handleSearchFilter = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchFilter(event.target.value));
  };

  return (
    <div className={styles.photos}>
      <div className={styles["search-filter"]}>
        <input
          type="text"
          placeholder="Search photos by name..."
          value={searchFilter}
          onChange={handleSearchFilter}
        />
      </div>
      <ul>
        {selectedPhotos.map((photo) => {
          return <li key={photo.id}>{photo.title}</li>;
        })}
      </ul>
    </div>
  );
};
