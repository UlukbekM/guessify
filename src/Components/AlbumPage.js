import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { useLocation } from 'react-router-dom'
import { AlbumCover } from "./AlbumCover";
import { AlbumTrack } from "./AlbumTrack";
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';

export const AlbumPage = () => {
    const [token, setToken] = useState("")
    const [album, setAlbum] = useState([])
    const [tracks, setTracks] = useState("")

    const location = useLocation()
    const { albumID } = location.state

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        setToken(token)
        getAlbum(token, albumID)
        // getTracks(token, albumID)
    }, [])

    const getAlbum = async (tempToken,id) => {
        const {data} = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
            headers: {
                Authorization: `Bearer ${tempToken}`
            },
            params: {
                id: id
            }
        })
        // console.log(data)
        setAlbum(data)
        setTracks(data.tracks.items)
    }

    // const getTracks = async (tempToken,id) => {
    //     const {data} = await axios.get(`https://api.spotify.com/v1/albums/${id}/tracks`, {
    //         headers: {
    //             Authorization: `Bearer ${tempToken}`
    //         },
    //         params: {
    //             id: id
    //         }
    //     })
    //     setTracks(data.items)
    //     // console.log(data.items)
    // }
    
    return(<>
        <Header/>
        <div className="trackContainer">
            <AlbumCover key={albumID} {...album}/>
            { album ? (
                <>
                </>
            ) : (<>
                <Skeleton variant="rectangular" height={130} 
                    sx={{ marginLeft: 2, marginRight: 2, marginTop: 2 }}/>
                <Skeleton variant="rectangular" height={130} 
                    sx={{ marginLeft: 2, marginRight: 2, marginTop: 2 }}/>
                <Skeleton variant="rectangular" height={130} 
                    sx={{ marginLeft: 2, marginRight: 2, marginTop: 2 }}/>
                <Skeleton variant="rectangular" height={130} 
                    sx={{ marginLeft: 2, marginRight: 2, marginTop: 2 }}/>
                <Skeleton variant="rectangular" height={130} 
                    sx={{ marginLeft: 2, marginRight: 2, marginTop: 2 }}/>
                </>
            )}
            {tracks.length > 0 &&
                tracks.map((track,index) => (
                    <AlbumTrack key={index} {...track} count={index} imgurl={album.images[1].url}/>
            ))}

            

        </div>
        <audio id="audioPlayer"></audio>
    </>)
}



export const tryAudio = (url) => {
    if(url !== null) {
        var player = document.getElementById('audioPlayer')
        player.volume=0.2
        player.src = url
        player.play()
    }
}

export const stopAudio = () => {
    var player = document.getElementById('audioPlayer')
    player.pause()
}
