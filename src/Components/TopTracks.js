import React from "react";
import {tryAudio, stopAudio} from "./PlaylistPage";

export const TopTracks = (song) => {
    const convertToTime = (duration) => {
        let time = (duration/60000).toFixed(2).toString()
        let index = time.indexOf('.')
        let newTime = time.substring(0,index) + ':' + time.substring(index+1,time.length)
        return newTime
    }

    let imgURL = ''
    if(song.album.images.length > 0) {
        imgURL = song.album.images[0].url
        // console.log(song.track.album.images)
    }

    // const removedCheck = (code) => {
    //     if(imgURL === '') {
    //         return '[ REMOVED ]'
    //     } else if(code === 'ALBUM') {
    //         return song.album.name
    //     } else if(code === 'TITLE') {
    //         return song.name
    //     }
    // }

    let removedCheck = false

    if(song.name === "") {
        removedCheck = true
    }

    return(<>
        {removedCheck === false ? 
        <div className="topContainer tT">
            {/* <div className="topSongItem fSmall">
                <p>{song.count+1}</p>
            </div> */}

            <div className="fSmall">
                <img src={imgURL} alt="" width={"200px"} height={"200px"} className="trackItemPartImages" onMouseOut={()=> stopAudio()} onMouseOver={()=>tryAudio(song.preview_url)}/>
            </div>

            <div className="topSongItem fNormal">
                <p>{song.name}</p>
            </div>

            <div className="topSongItem fNormal">
                <p>{song.artists[0].name}</p>
            </div>

            <div className="topSongItem fNormal">
                <p>{song.album.name}</p>
            </div>
            
            <div className="topSongItem fNormal">
                <p>{convertToTime(song.duration_ms)}</p>
            </div>
        </div>
        : 
        <>
        </>
        }
        
    </>)
}