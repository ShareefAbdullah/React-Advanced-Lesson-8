import { loadPhotos, setSearchFilter } from "../redux/actions";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Photos.module.css";
import { useTypedDispatch, useTypedSelector } from "../hooks";

export const Photos: React.FC = () => {
  const dispatch = useTypedDispatch();
  const photos = useTypedSelector((state) => state.photos.photos);
  const searchFilter = useTypedSelector((state) => state.photos.searchFilter);
  const isPhotosLoading = useTypedSelector(
    (state) => state.photos.isPhotosLoading
  );
  const { id: urlId } = useParams<{ id: string }>();
  const id = urlId ? parseInt(urlId, 10) : null;

  const selectedPhotos = photos
    .filter((photo) => photo.albumId === id)
    .filter((photo) => photo.title.indexOf(searchFilter) > -1);

  useEffect(() => {
    if (id !== null && !isNaN(id)) {
      dispatch(loadPhotos(id));
    }
  }, [id]);

  if (id === null || isNaN(id)) {
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

  const handleSearchFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
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
