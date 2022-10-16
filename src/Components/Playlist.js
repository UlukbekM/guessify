import React from "react";
import { Link } from "react-router-dom";

export const Playlist = (playlist) => {
    // console.log(playlist)
    return(<>
    
        <Link to={`/playlist`} state={{ playlistID: playlist.id }}>
            <div key={playlist.id} className="playlistItem noselect">
                {playlist.images.length ? <img width={"200rem"} height={"200rem"}src={playlist.images[0].url} alt=""/>: <div>No Image</div>}
                <p>{playlist.name}</p>
            </div>
        </Link>
    </>)
}