import { useDispatch, useSelector } from "react-redux";
import { Albums } from "./Albums";
import { Photos } from "./Photos";
import { useEffect } from "react";
import { loadAlbums, loadPhotos } from "../redux/actions";
import { Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const isAlbumsLoading = useSelector(state => state.albums.isAlbumsLoading);
  const isPhotosLoading = useSelector(state => state.photos.isPhotosLoading);

  useEffect(() => {
    dispatch(loadAlbums())
    dispatch(loadPhotos())
  }, []);

  if (isAlbumsLoading || isPhotosLoading) {
    return (
      <p className="preloader">Loading the data...</p>
    );
  }

  return (
    <div className="container">
      <Albums />
      
      <Routes>
        <Route
          path="/:id?"
          element={<Photos />}
        />
      </Routes>

    </div>
  );
}

export default App;
