import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Albums.module.css";
import { useTypedSelector } from "../hooks";
import { AlbumsType } from "../redux/actions";

export const Albums: React.FC = () => {
  const albums = useTypedSelector((state) => state.albums.albums);
  const { id: urlId } = useParams<{ id: string }>();
  const id = urlId ? parseInt(urlId, 10) : null;
  return (
    <div className={styles.albums}>
      <ul>
        {albums.map((album: AlbumsType) => {
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
