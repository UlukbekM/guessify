import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Header } from "./Header";
import { Playlist } from "./Playlist";
import { Buttons } from "./Buttons";


export const Item1 = () => {
    const [token, setToken] = useState("")
    const [user, setUser] = useState("")
    const [playlists, setPlaylists] = useState([])
    const [categories, setCategories] = useState([])
    const [userPlaylists, setUserPlaylists] = useState([])
    const [categoryPlaylists, setCategoryPlaylists] = useState([])

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
        getUser(token)
        getCategories(token)
        // getCategoryPlaylists('dinner',token)
    }, [])

    const getPlaylists = async (tempToken) => {
        const {data} = await axios.get("https://api.spotify.com/v1/browse/featured-playlists", {
            headers: {
                Authorization: `Bearer ${tempToken}`
            },
            params: {
                country: "US",
                limit: 20,
            }
        })
        setPlaylists(data.playlists.items)
        // console.log(data.playlists.items)
    }    
    
    const getUser = async (tempToken) => {
        const {data} = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${tempToken}`
            }
        })
        setUser(data)
        getUserPlaylists(data.id,tempToken)
    }

    const getUserPlaylists = async (id,tempToken) => {
        const {data} = await axios.get(`https://api.spotify.com/v1/users/${id}/playlists`, {
            headers: {
                Authorization: `Bearer ${tempToken}`
            }
        })
        // console.log(data.items)
        setUserPlaylists(data.items)
    }

    const getCategories = async (tempToken) => {
        const {data} = await axios.get(`https://api.spotify.com/v1/browse/categories`, {
            headers: {
                Authorization: `Bearer ${tempToken}`
            }
        })
        console.log(data.categories.items)
        setCategories(data.categories.items)
    }

    const getCategoryPlaylists = async (category_id, tempToken) => {
        const {data} = await axios.get(`https://api.spotify.com/v1/browse/categories/${category_id}/playlists`, {
            headers: {
                Authorization: `Bearer ${tempToken}`
            }
        })
        console.log(data)
    }

    return(<>
        <Header/>
        <div className="pageContainer">
            <h3>Featured Playlists</h3>
            <div className="playlistContainer">
            {playlists.length > 0 &&
                playlists.map((playlist,index) => (
                    <Playlist key={index} {...playlist}/>
            ))}
            </div>
        </div>

        <div className="pageContainer">
            <h3>User Playlists</h3>
            <div className="playlistContainer">
            {userPlaylists.length > 0 &&
                userPlaylists.map((playlist,index) => (
                    <Playlist key={index} {...playlist}/>
            ))}
            </div>
        </div>

        <div className="pageContainer">
            <h3>Categories</h3>
            <div className="playlistContainer">
            {categories.length > 0 &&
                categories.map((category,index) => (
                    <Buttons key={category.id} {...category}/>
            ))}
            </div>
        </div>
        
    </>)
}