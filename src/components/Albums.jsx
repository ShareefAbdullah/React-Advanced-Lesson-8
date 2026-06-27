import { useDispatch, useSelector } from "react-redux";
import { selectId } from "../redux/actions";

export const Albums = (props) => {
    const albums = useSelector(state => state.albums.albums);
    const selectedAlbumId = useSelector(state => state.albums.selectedAlbumId);
    const dispatch = useDispatch();


    const handleAlbumId = (id) =>{
        dispatch(selectId(id));
    }

    return (
        <div className="albums">
            <ul>
                {
                    albums.map((album) => {
                        return (
                            <li onClick={() => handleAlbumId(album.id)} key={album.id} className={selectedAlbumId === album.id ? "selected" : ""}>
                                {album.title}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
};