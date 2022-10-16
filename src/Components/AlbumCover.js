import React from "react";
import { Link } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';

export const AlbumCover = (album) => {
    let albumURL = ''
    if(album.images != null) {
        albumURL = album.images[0].url
    }

    let total = ''
    if(album.tracks != null) {
        total = album.tracks.total
    }

    let artist = ''
    if(album.artists != null) {
        artist = album.artists[0].name
    }

    // let artistURL = ''
    // if(album.artists != null) {
    //     artistURL = album.artists[0].name
    // }

    let release = ''
    if(album.release_date != null) {
        release = album.release_date.slice(0,4)
    }

    return(<>
        <div className="headerSpace"/>
        <div className="playlistCoverContainer">
            <div>
                { albumURL !== "" ? (
                    <img width={"200rem"} height={"200rem"}src={albumURL} alt=""/>
                ) : (
                    <Skeleton variant="rectangular" width={200} height={200} animation="wave"/>
                )}
            </div>

            <div className="playlistCoverTitle">
                <div className="playlistCoverItem">ALBUM</div>
                <div className="playlistCoverItem biggerFont">
                    { album.name ? 
                        <>{album.name}</>
                    : (
                        <Skeleton width={300} height={40} variant="rounded"/>
                    )}
                    
                </div>
                {/* <div className="playlistCoverItem">{album.description}</div> */}
                <div className="playlistCoverItem">
                    {/* <img width={"20rem"} height={"20rem"} src={albumURL} alt=""/>  */}
                    { artist ? 
                        <>{artist} • {release} • {total + " songs"}</>
                    : (
                        <Skeleton width={200} height={20} variant="rounded"/>
                    )}
                </div>
            </div>
            {/* <div className="playlistButton">
                <Link to={`/item3`} state={{ playlistID: album.id }} style={{ textDecoration: 'none' }}><button className="topButton">Select Playlist</button></Link>
            </div> */}
        </div>
    </>)
}