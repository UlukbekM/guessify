import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";

export const PlaylistCover = (playlist) => {

    let url = ''
    if(playlist.images != null) {
        url = playlist.images[0].url
    }

    let owner = ''
    if(playlist.owner != null) {
        owner = playlist.owner.display_name
    }

    let total = ''
    if(playlist.tracks != null) {
        total = playlist.tracks.total
    }

    // let publicCheck = "Public Playlist"
    // if(playlist.public != null) {
    //     publicCheck = "Private Playlist"
    // }

    return(<>
        <div className="playlistCoverContainer">
            <div><img width={"200rem"} src={url} alt=""/></div>
            <div className="playlistCoverTitle">
                <div className="playlistCoverItem">PLAYLIST</div>
                <div className="playlistCoverItem">{playlist.description}</div>
                <div className="playlistCoverItem biggerFont">{playlist.name}</div>
                <div className="playlistCoverItem">{owner} • {total + " songs"}</div>
            </div>
            <div className="playlistButton">
                <Link to={`/item3`} state={{ playlistID: playlist.id }} style={{ textDecoration: 'none' }}><button className="topButton">Select Playlist</button></Link>
            </div>
        </div>
    </>)
}