import React, {useEffect, useState} from "react";
import axios from 'axios';
import { Header } from "./Header";
import { useLocation } from 'react-router-dom'
import { Album } from "./Album";
import { TopTracks } from "./TopTracks"
import { artistChange } from "./TopTracks";

export const Artist = () => {
    const [token, setToken] = useState("")
    const [tracks, setTracks] = useState("")
    const [artist, setArtist] = useState("")
    const [albums, setAlbums] = useState("")
    const [newAlbums, setNewAlbums] = useState("")
    // const [playlists, setPlaylists] = useState("")

    const location = useLocation()
    const { artistID } = location.state

    useEffect(() => {
        newArtist()
    }, [artistChange])

    const newArtist = () => {
        if(artistChange !== "") {
            getArtist(token,artistChange)
            getArtistAlbums(token,artistChange)
            getArtistTracks(token,artistChange)
        }
    }

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        setToken(token)
        getArtist(token,artistID)
        getArtistAlbums(token,artistID)
        getArtistTracks(token,artistID)
        // getArtistPlaylists(token)
    }, [])


    const getArtist = async (tempToken,artist) => {
        const {data} = await axios.get(`https://api.spotify.com/v1/artists/${artist}`, {
            headers: {
                Authorization: `Bearer ${tempToken}`
            }
        })
        setArtist(data)
        // console.log(data)
    }

    const getArtistAlbums = async (tempToken,artist) => {
        const {data} = await axios.get(`https://api.spotify.com/v1/artists/${artist}/albums`, {
            headers: {
                Authorization: `Bearer ${tempToken}`
            },
            params: {
                include_groups: "album",
                limit: 50
            }
        })
        // console.log(data)
        setAlbums(data.items)
        getUniqueAlbums(data.items)
    }

    const getUniqueAlbums = (items) => {
        const unique = [...new Set(items.map(item => item.name))];

        let temp = []

        for(let i = 0; i < items.length; i++) {
            if(unique.includes(items[i].name)) {
                temp.push(items[i])
                unique.splice(unique.indexOf(items[i].name),1)
            }
        }
        setAlbums(temp)
    }

    const getArtistTracks = async (tempToken,artist) => {
        const {data} = await axios.get(`https://api.spotify.com/v1/artists/${artist}/top-tracks`, {
            headers: {
                Authorization: `Bearer ${tempToken}`
            },
            params: {
                market: "US"
            }
        })
        setTracks(data.tracks)
        // console.log(data)
    }

    // const getArtistPlaylists = async (tempToken) => {
    //     const {data} = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/albums`, {
    //         headers: {
    //             Authorization: `Bearer ${tempToken}`
    //         },
    //         params: {
    //             include_groups: "compilation",
    //             limit: 25
    //         }
    //     })
    //     setPlaylists(data.items)
    //     console.log(data)
    // }

    let imgURL = ""
    let genres = ""
    let followers = 0

    if(artist) {
        imgURL = artist.images[0].url
        for(let i = 0; i < artist.genres.length; i++) {
            if(i === 0) {
                genres = artist.genres[i]
            } else {
                genres += ", " + artist.genres[i]
            }
        }
        followers = artist.followers.total.toLocaleString()
    }


    return(<>
    <Header/>

    <div className="headerSpace"/>
    <div className="artistContainer">
        <div className="artistCover">
            <div className="artistItem">
                <img src={imgURL} alt="" width={"200px"} height={"200px"} />
            </div>
            <div className="artistItem fNormal">
                <div><h1>{artist.name}</h1></div>
                <div><h4>{genres}</h4></div>
                <div><h4>Followers: {followers}</h4></div>
            </div>
            <div className="artistItem">
                <div className="artistPopularity">
                    {artist.popularity}
                </div>
            </div>
        </div>

        <div className="trackContainer">
            <h2>Top Tracks</h2>
            <div className="topContainer">
                {/* <div className="fSmall"><p>#</p></div> */}
                <div className="fSmall topBarItemCenter"><p></p></div>
                <div className="fNormal topBarItemLeft"><p>TITLE</p></div>
                <div className="fNormal topBarItemLeft"><p>ARTIST</p></div>
                <div className="fNormal topBarItemCenter"><p>ALBUM</p></div>
                <div className="fNormal topBarItemCenter"><p>DURATION</p></div>
            </div>
            {tracks.length > 0 &&
                tracks.map((track,index) => (
                    <TopTracks key={index} {...track} count={index}/>
            ))}
        </div>

        <div className="pageContainer">
            <h2>Albums</h2>
            <div className="albumContainer">
                {albums.length > 0 &&
                    albums.map((album,index) => (
                        <Album key={index} {...album}/>
                ))}
            </div>
        </div>

        {/* <div className="pageContainer">
            <h2>Appears On</h2>
            <div className="albumContainer">
                {playlists.length > 0 &&
                    playlists.map((playlist,index) => (
                        <Album key={index} {...playlist}/>
                ))}
            </div>
        </div> */}
    </div>
            <audio id="audioPlayer"></audio>


    </>)
}