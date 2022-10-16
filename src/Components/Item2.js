import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { TopArtists } from "./TopArtists";
import { TopTracks } from "./TopTracks";
import axios from 'axios';

export const Item2 = () => {
    
    const [token, setToken] = useState("")
    const [userDATA, setUserDATA] = useState("")
    const [userProfile, setUserProfile] = useState("https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png")

    const [artists, setArtists] = useState("")
    const [tracks, setTracks] = useState("")

    const [current, setCurrent] = useState("artists")
    const [termRange, setTermRange] = useState("short_term")

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        setToken(token)
        getUser(token)
        resetCurrent()
    }, [])

    const resetCurrent = () => {
        const artistsButton = document.getElementById('1');
        artistsButton.classList.add("highlight")
        const tracksButton = document.getElementById('2');
        tracksButton.classList.remove("highlight")
    }

    const getUser = async (tempToken) => {
        const {data} = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${tempToken}`
            }
        })
        setUserDATA(data)

        if(data.images.length === 0) {
            console.log('0 length')
        } else {
            setUserProfile(data.images[0].url)
        }
    }

    const getUserTopItems = async (item,term) => {
        const {data} = await axios.get(`https://api.spotify.com/v1/me/top/${item}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                limit:50,
                time_range: term
            }
        })
        if(item === "artists") {
            setArtists(data.items)
        } else if (item === "tracks") {
            setTracks(data.items)
        }
    }

    useEffect(() => {
        if(token !== "") {
            getUserTopItems("artists",termRange)
            getUserTopItems("tracks",termRange)
        }
    },[token])

    const returnCurrent = () => {
        if(current === "artists") {
            return "Top Artists"
        } else if (current === "tracks") {
            return "Top Tracks"
        }
    }

    const changeCurrent = ( item ) => {
        if(item === "artists") {
            if(current !== item) {
                setCurrent(item)
                console.log("switched to " + item)
            }
        } else if(item === "tracks") {
            if(current !== item) {
                setCurrent(item)
                console.log("switched to " + item)
            }
        }

        const artistsButton = document.getElementById('1');
        const tracksButton = document.getElementById('2');
        if(item === 'artists') {
            tracksButton.classList.remove("highlight")
            artistsButton.classList.add("highlight")
        } else {
            artistsButton.classList.remove("highlight")
            tracksButton.classList.add("highlight")
        }

        const shortRange = document.getElementById('3')
        const mediumRange = document.getElementById('4')
        const longRange = document.getElementById('5')

        shortRange.classList.remove("rangeButton")
        shortRange.classList.add("rangeButtonSelected")
        mediumRange.classList.remove("rangeButtonSelected")
        mediumRange.classList.add("rangeButton")
        longRange.classList.remove("rangeButtonSelected")
        longRange.classList.add("rangeButton")
    }

    const changeRange = ( range ) => {
        // console.log(range, termRange)
        if(range !== termRange) {
            console.log(range)
            const shortRange = document.getElementById('3')
            const mediumRange = document.getElementById('4')
            const longRange = document.getElementById('5')
    
            if(range === 'short_term') {
                // termRange = "short_term"
                setTermRange(range)
                getUserTopItems(current,range)
    
    
                mediumRange.classList.remove("rangeButtonSelected")
                mediumRange.classList.add("rangeButton")
                longRange.classList.remove("rangeButtonSelected")
                longRange.classList.add("rangeButton")
    
                shortRange.classList.remove("rangeButton")
                shortRange.classList.add("rangeButtonSelected")
            } else if(range === 'medium_term') {
                // termRange = "medium_term"
                setTermRange(range)
                getUserTopItems(current,range)
    
    
                shortRange.classList.remove("rangeButtonSelected")
                shortRange.classList.add("rangeButton")
                longRange.classList.remove("rangeButtonSelected")
                longRange.classList.add("rangeButton")
    
                mediumRange.classList.remove("rangeButton")
                mediumRange.classList.add("rangeButtonSelected")
            } else if(range === 'long_term') {
                // termRange = "long_term"
                setTermRange(range)
                getUserTopItems(current,range)
    
    
                shortRange.classList.remove("rangeButtonSelected")
                shortRange.classList.add("rangeButton")
                mediumRange.classList.remove("rangeButtonSelected")
                mediumRange.classList.add("rangeButton")
    
                longRange.classList.remove("rangeButton")
                longRange.classList.add("rangeButtonSelected")
            }
        }
    }

    return(<>
        <Header/>
        <div className="headerSpace"/>
        <div className="topOptions">
            <div className="topOptionsItem">
                <div className="imageBorder">
                    <img src={userProfile} alt="" width={"200px"} height={"200px"}/>
                </div>
                <p className="f3">{userDATA.display_name}'s {returnCurrent()}</p> 
            </div>
            <div>
                <button onClick={() => changeCurrent("artists")} className="topButton" id='1'>Switch to Top Artists</button>
                <button onClick={() => changeCurrent("tracks")} className="topButton" id='2'>Switch to Top Tracks</button>       
            </div> 
        </div>

        {current === "artists" ? 
            <div className="topArtistsContainer">
                <div className="rangeContainer">
                    <button className="rangeButtonSelected" onClick={()=> changeRange("short_term")} id='3'>Short term</button>
                    <button className="rangeButton" onClick={()=> changeRange("medium_term")} id='4'>Medium term</button>
                    <button className="rangeButton" onClick={()=> changeRange("long_term")} id='5'>Long term</button>
                </div>
                <div className="topContainer">
                    <div className="f0 f1"><p>POSITION</p></div>
                    <div className="f0 f2"><p>ARTIST</p></div>
                </div>
                {artists.length > 0 &&
                    artists.map((artist,index) => (
                        <TopArtists key={index} {...artist} count={index}/>
                ))}
            </div>
        : 
        <div className="topArtistsContainer">
            <div className="rangeContainer">
                <button className="rangeButtonSelected" onClick={()=> changeRange("short_term")} id='3'>Short term</button>
                <button className="rangeButton" onClick={()=> changeRange("medium_term")} id='4'>Medium term</button>
                <button className="rangeButton" onClick={()=> changeRange("long_term")} id='5'>Long term</button>
            </div>
            <div className="topContainer">
                {/* <div className="fSmall"><p>#</p></div> */}
                <div className="fSmall topBarItemCenter"><p></p></div>
                <div className="fNormal topBarItemLeft"><p>TITLE</p></div>
                <div className="fNormal topBarItemLeft"><p>ARTIST</p></div>
                <div className="fNormal topBarItemCenter"><p>ALBUM</p></div>
                <div className="fNormal topBarItemCenter"><p>DURATION</p></div>
            </div>

            
            {tracks.length > 0 &&
                tracks.map((song,index) => (
                    <TopTracks key={index} {...song} count={index}/>
            ))}
            <audio id="audioPlayer"></audio>
        </div>
        }





        </>)
}



// export const tryAudio = (url) => {
//     var player = document.getElementById('audioPlayer')
//     player.volume=0.2
//     player.src = url
//     player.play()
//     // console.log(url)
// }

// export const stopAudio = () => {
//     var player = document.getElementById('audioPlayer')
//     player.pause()
// }