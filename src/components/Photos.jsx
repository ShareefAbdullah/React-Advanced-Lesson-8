import { useSelector, useDispatch } from "react-redux";
import { setSearchFilter } from "../redux/actions";
import { useParams } from "react-router-dom";

export const Photos = (props) => {
    const dispatch = useDispatch();
    const photos = useSelector(state => state.photos.photos);
    const searchFilter = useSelector(state => state.photos.searchFilter);
    const id = parseInt(useParams().id);
    const selectedPhotos = photos
        .filter(photo => photo.albumId === id)
        .filter(photo => photo.title.indexOf(searchFilter) > -1);
    
    
    
    

    if(isNaN(id)) {
        return (
            <h3 className="no-selected-album"><span>←</span> Select an Album</h3>
        );
    }

    const handleSearchFilter = (event) => {
        dispatch(setSearchFilter(event.target.value));
    }

    return (
        <div className="photos">
            <div className="search-filter">
                <input
                    type="text" 
                    placeholder="Search photos by name..." 
                    value={searchFilter}
                    onChange={handleSearchFilter}
                />
            </div>
            <ul>
                {
                    selectedPhotos.map((photo) => {
                        return (
                            <li key={photo.id}>
                                {photo.title}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
};