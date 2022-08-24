import React from "react";
import { Link } from "react-router-dom";

export const TopArtists = (artist) => {
    const openArtist = (link) => {
        window.open(link)
    }
    //onClick={()=>openArtist(artist.external_urls.spotify)}
    return(<>
        <div className="topContainer tA">
            <div className="f0 f1">
                <p>{artist.count+1}</p>
            </div>
            <div className="f0 f2">
                <div className="topArtist">
                    <div className="t1">
                        <Link to={`/artist`} state={{artistID: artist.id}}><img src={artist.images[0].url} alt="" className="trackItemPartImages" width={"200px"} height={"200px"} /></Link>
                    </div>
                    <div className="t1">
                        <p>{artist.name}</p>
                    </div>
                </div>
            </div>
        </div>  
    </>)
}