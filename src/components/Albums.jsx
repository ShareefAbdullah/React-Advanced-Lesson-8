import { useDispatch, useSelector } from "react-redux";
import { selectId } from "../redux/actions";

export const Albums = (props) => {
    const albums = useSelector(state => state.albums);
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
                            <li onClick={() => handleAlbumId(album.id)} key={album.id}>
                                {album.title}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
};