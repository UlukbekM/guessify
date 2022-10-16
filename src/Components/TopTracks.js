import React from "react";
import {tryAudio, stopAudio} from "./PlaylistPage";
import { Link } from "react-router-dom";
import ExplicitIcon from '@mui/icons-material/Explicit';

export let artistChange = ""

export const TopTracks = (song) => {
    // console.log(song)
    const convertToTime = (duration) => {
        let time = (duration/60000).toFixed(2).toString()
        let index = time.indexOf('.')
        let newTime = time.substring(0,index) + ':' + time.substring(index+1,time.length)
        return newTime
    }

    let imgURL = ''
    if(song.album.images.length > 0) {
        imgURL = song.album.images[0].url
    }

    let removedCheck = false

    if(song.name === "") {
        removedCheck = true
    }

    const testFunction = (artist) => {
        if(window.location.href.includes("artist")) {
            artistChange = artist
        }
    }

    return(<>
        {removedCheck === false ? 
        <div className="topContainer tT">
            {/* <div className="topSongItem fSmall">
                <p>{song.count+1}</p>
            </div> */}

            <div className="fSmall topBarItemCenter">
                <img src={imgURL} alt="" width={"200px"} height={"200px"} className="trackItemPartImages" onMouseOut={()=> stopAudio()} onMouseOver={()=>tryAudio(song.preview_url)}/>
            </div>

            <div className="fNormal topBarItemLeft item-space">
                {song.explicit ? <ExplicitIcon  className="artistIcon"/> :<></> }
                <p> {song.name}</p>
            </div>

            <div className="topSongItem fNormal albumArtist item-space artist-list">
                {/* <p>{song.artists[0].name}</p> */}
                {song.artists.length > 0 &&
                    song.artists.map((artist,index) => (
                        <>
                            { (!index ? " ": ',')}
                            <Link to={`/artist`} state={{artistID: artist.id}} style={{ textDecoration: 'none' }} onClick={()=>testFunction(artist.id)}> 
                                {artist.name}  
                            </Link>
                        </>
                ))}
            </div>

            <div className="topSongItem fNormal item-space">
                <p>{song.album.name}</p>
            </div>
            
            <div className="topSongItem fNormal item-space">
                <p>{convertToTime(song.duration_ms)}</p>
            </div>
        </div>
        : 
        <>
        </>
        }
        
    </>)
}