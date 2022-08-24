import React from "react";
import { Link } from "react-router-dom";

export const Album = (album) => {
    // console.log(playlist)
    return(<>
    {/* <Link to={`/playlist`} state={{ playlistID: playlist.id }}> */}
        <div className="albumItem noselect">
            {album.images.length ? <img width={"200rem"} src={album.images[0].url} alt=""/>: <div>No Image</div>}
            <h4>{album.name}</h4>
        </div>
    {/* </Link> */}
    </>)
}