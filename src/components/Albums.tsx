import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./albums.module.scss";
import { useTypedSelector } from "../redux/hooks";

export const Albums: React.FC = () => {
  const albums = useTypedSelector((state) => state.albums.albums);
  const { id } = useParams<{ id: string }>();
  const numberId = Number(id);

  return (
    <div className={styles.albums}>
      <ul>
        {albums.map((album) => {
          return (
            <li
              key={album.id}
              className={numberId === album.id ? styles.selected : ""}
            >
              <Link to={`/${album.id}`}>{album.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
