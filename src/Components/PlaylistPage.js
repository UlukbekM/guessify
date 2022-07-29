import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Header } from "./Header";
import { useLocation } from 'react-router-dom'
import { Track } from "./Track"
import { PlaylistCover } from "./PlaylistCover";

export const PlaylistPage = () => {
    const [token, setToken] = useState("")
    const [tracks, setTracks] = useState("")
    const [playlist, setPlaylist] = useState("")

    const location = useLocation()
    const { playlistID } = location.state

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        setToken(token)
        getTracks(token,playlistID)
        getPlaylist(token,playlistID)
    }, [])

    const getTracks = async (tempToken,id) => {
        const {data} = await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
            headers: {
                Authorization: `Bearer ${tempToken}`
            },
            params: {
            }
        })
        setTracks(data.items)
        // console.log(data.items)
    }

    const getPlaylist = async (tempToken,id) => {
        const {data} = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
                Authorization: `Bearer ${tempToken}`
            },
            params: {
            }
        })
        setPlaylist(data)
        // console.log(data)
    }

    return(<>
        <Header/>
        <div className="trackContainer">
            <PlaylistCover key={playlistID} {...playlist}/>
            {tracks.length > 0 &&
                tracks.map((track,index) => (
                    <Track key={index} {...track} count={index}/>
            ))}
        </div>
    </>)
}