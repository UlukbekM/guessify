import React, { useState, useEffect }  from "react";
// import { getURL } from "./Item1";
// import { playAudio, tryAudio, stopAudio} from "./PlaylistPage";
import {tryAudio, stopAudio} from "./PlaylistPage";
import { Link } from "react-router-dom";
import ExplicitIcon from '@mui/icons-material/Explicit';

export const Track = (song) => {
    // console.log(song)
    let removedCheck = false
    if(song.track === null) {
        removedCheck = true
        console.log(song)
    }
    const findDifference = (time) => {
        var currenttime  =  new Date().toISOString();
        var d1 = new Date(time)
        var d2 = new Date(currenttime)
        let difference = (d1-d2)/(1000*3600*24)
        difference = Math.round(difference*-1)

        if(difference === 1) {
            return "1 day ago"
        } else if (difference < 31){
            return difference.toString() + " days ago"
        } else if (difference >= 31) {
            let year = time.substring(0,4)
            let month = time.substring(5,7)
            let day = time.substring(8,10)

            if(day.indexOf('0')===0) {
                day = day.substring(1)
            }

            let date = "";

            if(month === "01") {
                date = "January " + day + ", " + year
            }
            else if(month === "02") {
                date = "February " + day + ", " + year
            }
            else if(month === "03") {
                date = "March " + day + ", " + year
            }
            else if(month === "04") {
                date = "April " + day + ", " + year
            }
            else if(month === "05") {
                date = "May " + day + ", " + year
            }
            else if(month === "06") {
                date = "June " + day + ", " + year
            }
            else if(month === "07") {
                date = "July " + day + ", " + year
            }
            else if(month === "08") {
                date = "August " + day + ", " + year
            }
            else if(month === "09") {
                date = "September " + day + ", " + year
            }
            else if(month === "10") {
                date = "October " + day + ", " + year
            }
            else if(month === "11") {
                date = "November " + day + ", " + year
            }
            else if(month === "12") {
                date = "December " + day + ", " + year
            }
            return date
        }
    }

    const convertToTime = (duration) => {
        let time = (duration/60000).toFixed(2).toString()
        let index = time.indexOf('.')
        let newTime = time.substring(0,index) + ':' + time.substring(index+1,time.length)
        return newTime
    }

    const [count, setCount] = useState(1)

    let artists = ''

    let imgURL = ''
    if(song.track !== null) {
        if(song.track.album.artists.length === 1) {
            artists = song.track.album.artists[0].name
        } else {
            song.track.album.artists.forEach((x, i) => {
                if(i === 0) {
                    artists = x.name
                } else {
                    artists += ", " + x.name
                }
            });
        }

        if(song.track.album.images.length > 0) {
            imgURL = song.track.album.images[0].url
        }
    }

    // const removedCheck = (code) => {
    //     if(imgURL === '') {
    //         return '[ REMOVED ]'
    //     } else if(code === 'ALBUM') {
    //         return song.track.album.name
    //     } else if(code === 'TITLE') {
    //         return song.track.name
    //     }
    // }

    // const getURI = () => {
    //     console.log(song.track.uri)
    // }

    var comma = true
    const giveComma = () => {
        if(comma === true) {
            comma = false
            return ","
        } else {
            comma = true
            return ""
        }
    }


    if(song.track !== null && song.track.album.name === "") {
        removedCheck = true
    }
    // if(song.track.album.name === "") {
    //     removedCheck = true
    // }

    

    return(<>
        {removedCheck === false ? 
            <div key={song.track.id} className="trackItem">
                <div className="playlistTop">
                    <div className="playlistTopItem fSmaller">
                        <p>#</p>
                    </div>
                    <div className="playlistTopItem fLarge">
                        <p>TITLE</p>
                    </div>
                    <div className="playlistTopItem fNormal">
                        <p>ALBUM</p>
                    </div>
                    <div className="playlistTopItem fNormal">
                        <p>DATE ADDED</p>
                    </div>
                    <div className="playlistTopItem fNormal">
                        <p>DURATION</p>
                    </div>
                </div>

                <div className="playlistTop">
                    <div className="playlistTopItem fSmaller">
                        {song.count+1}
                    </div>
                    <div className="playlistTopItem fLarge flex">
                        <div>
                            {/* <img width={"100rem"} src={imgURL} alt="" onMouseOut={()=> stopAudio()} className="trackItemPartImages" onClick={()=>playAudio(song.track.preview_url)} onMouseOver={()=>tryAudio(song.track.preview_url)}/> */}
                            <img width={"100rem"} src={imgURL} alt="" onMouseOut={()=> stopAudio()} className="trackItemPartImages" onMouseOver={()=>tryAudio(song.track.preview_url)}/>
                        </div>
                        <div className="playlistTitle">
                            <div><h3>{song.track.name}</h3></div>
                            <div className="albumArtist">
                                {song.track.explicit ? <ExplicitIcon  className="artistIcon"/> :<></> }
                                {/* <Link to={`/artist`} state={{artistID: song.track.artists[0].id}}>{artists}</Link> */}
                                {song.track.artists.length > 0 &&
                                    song.track.artists.map((artist,index) => (
                                        <>
                                            { (!index ? " ": ',')}
                                            <Link to={`/artist`} state={{artistID: artist.id}} style={{ textDecoration: 'none' }}> 
                                                {artist.name} 
                                            </Link>
                                        </>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="playlistTopItem fNormal">
                        {song.track.album.name}
                    </div>
                    <div className="playlistTopItem fNormal">
                        {findDifference(song.added_at)}
                    </div>
                    <div className="playlistTopItem fNormal">
                        {convertToTime(song.track.duration_ms)}
                    </div>
                </div>
            </div>
        : 
        <>
        </>
        }
        
    </>)
}
