import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export const Albums = (props) => {
    const albums = useSelector(state => state.albums.albums);
    const id = parseInt(useParams().id)

    return (
        <div className="albums">
            <ul>
                {
                    albums.map((album) => {
                        return (
                            <li  
                                key={album.id} 
                                className={id === album.id ? "selected" : ""}
                            >
                                <Link to={`/${album.id}`}>
                                    {album.title}
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
};