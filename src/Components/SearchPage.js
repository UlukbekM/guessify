import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Header } from "./Header";
import { searchItem } from "./Header";
import { Playlist } from "./Playlist";
import TextField from '@mui/material/TextField';


export const SearchPage = () => {
    const [token, setToken] = useState("")
    const [playlists, setPlaylists] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        setToken(token)
        if(searchItem !== "") getSearch(token, searchItem)
    }, [])

    const getSearch = async (tempToken,searchName) => {
        const {data} = await axios.get(`https://api.spotify.com/v1/search`, {
            headers: {
                Authorization: `Bearer ${tempToken}`
            },
            params: {
                q: searchName,
                type: "playlist",
                limit: 35
            }
        })
        setPlaylists(data.playlists.items)
    }


    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getSearch(token, search)
    }

    return(<>
        <Header/>

        <form className="searchPageForm" onSubmit={handleSubmit}>
            <input type="text" placeholder="Search.." onChange={handleChange} className="searchPageBar"/>
        </form>

        <div className="pageContainer">
            <h3>Search results:</h3>
            <div className="playlistContainer">
            {playlists.length > 0 &&
                playlists.map((playlist,index) => (
                    <Playlist key={index} {...playlist}/>
            ))}
            </div>
        </div> 
    </>)
}