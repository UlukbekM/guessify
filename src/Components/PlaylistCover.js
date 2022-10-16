import React from "react";
import { Link } from "react-router-dom";
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Skeleton from '@mui/material/Skeleton';

export const PlaylistCover = (playlist) => {
    // console.log(playlist)
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
        <div className="headerSpace"/>
        <div className="playlistCoverContainer">
            <div>
                { playlist.images ? (
                    <img width={"200rem"} height={"200rem"}src={url} alt=""/>
                ) : (
                    <Skeleton variant="rectangular" width={200} height={200} animation="wave"/>
                )}
            </div>
            <div className="playlistCoverTitle">
                <div className="playlistCoverItem">PLAYLIST</div>

                <div className="playlistCoverItem biggerFont">
                    { playlist.name ? 
                        <>{playlist.name}</>
                    : (
                        <Skeleton width={300} height={40} variant="rounded"/>
                    )}
                </div>

                <div className="playlistCoverItem">
                    { playlist.description ? 
                        <>{playlist.description}</>
                    : (
                        <Skeleton width={500} height={20} variant="rounded"/>
                    )}
                </div>

                <div className="playlistCoverItem">
                    { owner ? 
                        <>{owner} • {total + " songs"}</>
                    : (
                        <Skeleton width={200} height={20} variant="rounded"/>
                    )}
                </div>
            </div>
            <div className="playlistButton">
                <Link to={`/item3`} state={{ playlistID: playlist.id }} style={{ textDecoration: 'none' }}>
                    <button className="topButton">
                        {/* <PlayArrowIcon className="artistIcon"/> */}
                        Select Playlist
                    </button>
                </Link>
            </div>
        </div>
    </>)
}