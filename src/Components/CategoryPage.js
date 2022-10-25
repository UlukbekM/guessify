import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Header } from "./Header";
import { Playlist } from "./Playlist";
import { useLocation } from 'react-router-dom'

export const CategoryPage = () => {
    const [token, setToken] = useState("")
    const [playlists, setPlaylists] = useState("")

    const location = useLocation()
    const { categoryID } = location.state

    const { categoryName } = location.state

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        setToken(token)
        getPlaylists(token)
    }, [])

    const getPlaylists = async (tempToken) => {
        const {data} = await axios.get(`https://api.spotify.com/v1/browse/categories/${categoryID}/playlists`, {
            headers: {
                Authorization: `Bearer ${tempToken}`
            },
            params: {
            }
        })
        // setTracks(data.items)
        // console.log(data.playlists.items)
        setPlaylists(data.playlists.items)
    }

    return(<>
        {/* <Header/> */}
        {/* {categoryID} */}
        <div className="headerSpace"/>
        <div className="pageContainer">
            <h3>{categoryName} Playlists</h3>
            <div className="playlistContainer">
            {playlists.length > 0 &&
                playlists.map((playlist,index) => (
                    <Playlist key={index} {...playlist}/>
            ))}
            </div>
        </div>
    </>)
}