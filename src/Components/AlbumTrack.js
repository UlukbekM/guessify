import React  from "react";
import { tryAudio, stopAudio } from "./AlbumPage";
import { Link } from "react-router-dom";
import ExplicitIcon from '@mui/icons-material/Explicit';

export const AlbumTrack = (song) => {
    // console.log(song)
    let removedCheck = false
    if(song.track === null) {
        removedCheck = true
        console.log(song)
    }

    const convertToTime = (duration) => {
        let time = (duration/60000).toFixed(2).toString()
        let index = time.indexOf('.')
        let newTime = time.substring(0,index) + ':' + time.substring(index+1,time.length)
        return newTime
    }

    
    // let imgURL = ''
    // if(song.tracks != null) {
    //     total = album.tracks.total
    // }

    return(<>

    {removedCheck === false ? 
    <div key={song.id} className="trackItem">
                <div className="playlistTop">
                    <div className="playlistTopItem fSmaller">
                        <p>#</p>
                    </div>
                    <div className="playlistTopItem fLarge">
                        <p>TITLE</p>
                    </div>
                    {/* <div className="playlistTopItem fNormal">
                        <p>ALBUM</p>
                    </div> */}
                    {/* <div className="playlistTopItem fNormal">
                        <p>DATE ADDED</p>
                    </div> */}
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
                            <img width={"100rem"} src={song.imgurl} alt="" onMouseOut={()=> stopAudio()} className="trackItemPartImages" onMouseOver={()=>tryAudio(song.preview_url)}/>
                        </div>
                        <div className="playlistTitle">
                            <div> <h3>{song.name}</h3></div>
                            <div className="albumArtist">
                                {song.explicit ? <ExplicitIcon  className="artistIcon"/> :<></> }
                                {/* <Link to={`/artist`} state={{artistID: song.track.artists[0].id}}>{artists}</Link> */}
                                {song.artists.length > 0 &&
                                    song.artists.map((artist,index) => (
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
                    {/* <div className="playlistTopItem fNormal">
                        {song.album.name}
                    </div> */}
                    {/* <div className="playlistTopItem fNormal">
                        {findDifference(song.added_at)}
                    </div> */}
                    <div className="playlistTopItem fNormal">
                        {convertToTime(song.duration_ms)}
                    </div>
                </div>
            </div>
        : 
        <>
        </>
        }

    </>)
}