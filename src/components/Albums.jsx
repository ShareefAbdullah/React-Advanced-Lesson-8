import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styles from "./Albums.module.css";

export const Albums = (props) => {
  const albums = useSelector((state) => state.albums.albums);
  const id = parseInt(useParams().id);

  return (
    <div className={styles.albums}>
      <ul>
        {albums.map((album) => {
          return (
            <li
              key={album.id}
              className={id === album.id ? styles.selected : ""}
            >
              <Link to={`/${album.id}`}>{album.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
