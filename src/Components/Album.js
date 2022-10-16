import React from "react";
import { Link } from "react-router-dom";

export const Album = (album) => {
    // console.log(playlist)
    return(<>
        <Link to={`/album`} state={{ albumID: album.id }}>
            <div className="playlistItem noselect">
                    {album.images.length ? <img width={"200rem"} src={album.images[0].url} alt=""/>: <div>No Image</div>}
                    <p>{album.name}</p>
            </div>
        </Link>

    </>)
}