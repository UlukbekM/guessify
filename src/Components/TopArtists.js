import React from "react";

export const TopArtists = (artist) => {
    const openArtist = (link) => {
        window.open(link)
    }

    return(<>
        <div className="topContainer tA">
            <div className="f0 f1">
                <p>{artist.count+1}</p>
            </div>
            <div className="f0 f2">
                <div className="topArtist">
                    <div className="t1">
                        <img src={artist.images[0].url} alt="" className="trackItemPartImages" width={"200px"} height={"200px"} onClick={()=>openArtist(artist.external_urls.spotify)}/>
                    </div>
                    <div className="t1">
                        <p>{artist.name}</p>
                    </div>
                </div>
            </div>
        </div>  
    </>)
}