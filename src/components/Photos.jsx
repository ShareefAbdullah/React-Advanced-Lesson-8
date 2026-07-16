import { useSelector, useDispatch } from "react-redux";
import { loadPhotos, setSearchFilter } from "../redux/actions";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Photos.module.css";

export const Photos = (props) => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos.photos);
  const searchFilter = useSelector((state) => state.photos.searchFilter);
  const isPhotosLoading = useSelector((state) => state.photos.isPhotosLoading);
  const id = parseInt(useParams().id);
  const stringId = id.toString();
  const selectedPhotos = photos
    .filter((photo) => photo.albumId === id)
    .filter((photo) => photo.title.indexOf(searchFilter) > -1);

  useEffect(() => {
    if (id) {
      dispatch(loadPhotos(stringId));
    }
  }, [stringId]);

  if (isNaN(id)) {
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

  const handleSearchFilter = (event) => {
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
