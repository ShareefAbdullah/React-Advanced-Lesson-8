import { Albums } from "./Albums";
import { Photos } from "./Photos";
import React, { useEffect } from "react";
import { loadAlbums } from "../redux/actions";
import { Route, Routes } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "../hooks";

export const App: React.FC = () => {
  const dispatch = useTypedDispatch();
  const isAlbumsLoading = useTypedSelector(
    (state) => state.albums.isAlbumsLoading
  );

  useEffect(() => {
    dispatch(loadAlbums());
  }, []);

  if (isAlbumsLoading) {
    return <p className="preloader">Loading the albums...</p>;
  }

  return (
    <div className="container">
      <Routes>
        <Route
          path="/:id?"
          element={
            <div className="wrapper">
              <Albums />
              <Photos />
            </div>
          }
        />
      </Routes>
    </div>
  );
};
