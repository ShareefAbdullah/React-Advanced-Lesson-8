import { useDispatch, useSelector } from "react-redux";
import { Albums } from "./Albums";
import { Photos } from "./Photos";
import { useEffect } from "react";
import { loadAlbums } from "../redux/actions";
import { Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const isAlbumsLoading = useSelector((state) => state.albums.isAlbumsLoading);

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
}

export default App;
