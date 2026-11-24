import { Albums } from "./Albums";
import { Photos } from "./Photos";
import { useEffect } from "react";
import { loadAlbums } from "../redux/albums/albumsSlice";
import { Route, Routes } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "../redux/hooks";

function App() {
  const dispatch = useTypedDispatch();
  const isAlbumsLoading = useTypedSelector(
    (state) => state.albums.isAlbumsLoading
  );
  const isAlbumsError = useTypedSelector((state) => state.albums.error);
  useEffect(() => {
    dispatch(loadAlbums());
  }, []);

  if (isAlbumsLoading) {
    return <p className="preloader">Loading albums...</p>;
  }

  if (isAlbumsError) {
    return <p className="preloader-error">Failed to load albums...</p>;
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
}

export default App;
