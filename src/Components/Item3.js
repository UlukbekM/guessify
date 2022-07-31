import React,{useState, useEffect} from "react";
import { useLocation } from 'react-router-dom'
import { Header } from "./Header";
import axios from 'axios';

export const Item3 = () => {
    const [token, setToken] = useState("")
    const [score, setScore] = useState(0)
    const [playlist, setPlaylist] = useState("")

    const [songUrl, setSongUrl] = useState("")
    const [song1, setSong1] = useState("")
    const [song2, setSong2] = useState("")
    const [song3, setSong3] = useState("")
    const [song4, setSong4] = useState("")


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
        getPlaylist(token,playlistID)
    }, [])

    const getPlaylist = async (tempToken,id) => {
        const {data} = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
                Authorization: `Bearer ${tempToken}`
            },
            params: {
            }
        })
        setPlaylist(data)
        console.log(data)
        pickNumber(data)
    }

    let url = ''
    if(playlist.images != null) {
        url = playlist.images[0].url
    }

    const pickNumber = (data) => {
        var arr = [];
        while(arr.length < 4){
            var r = Math.floor(Math.random() * data.tracks.total);
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        setSongUrl(data.tracks.items[arr[0]].track.preview_url)
        setSong1(data.tracks.items[arr[0]].track.name)
        setSong2(data.tracks.items[arr[1]].track.name)
        setSong3(data.tracks.items[arr[2]].track.name)
        setSong4(data.tracks.items[arr[3]].track.name)
    }

    const newSong = () => {
        var arr = [];
        while(arr.length < 4){
            var r = Math.floor(Math.random() * playlist.tracks.total);
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        setSongUrl(playlist.tracks.items[arr[0]].track.preview_url)
        setSong1(playlist.tracks.items[arr[0]].track.name)
        setSong2(playlist.tracks.items[arr[1]].track.name)
        setSong3(playlist.tracks.items[arr[2]].track.name)
        setSong4(playlist.tracks.items[arr[3]].track.name)
    }

    const checkButton = (title) => {
        if(title === song1) {
            setScore(score+1)
            newSong()
        } else {
            setScore(0)
            newSong()
        }
    }

    useEffect(() => {
        let player = document.getElementById('audioPlayer')
        player.play()
        player.volume = 0.2
    },[songUrl]) // <-- here put the parameter to listen

    return(<>
        <Header/>
        <div className="selectedContainer">
            <div>
                <h1>{playlist.name}</h1>
                <h3>Score: {score}</h3>
            </div>

            <div>
                <img width={"250rem"} src={url} alt=""/>
            </div>

            <div>
                <h1>{song1}</h1>
                <audio id="audioPlayer" src={songUrl} controls></audio>
            </div>

            <div>
                <button onClick={()=>newSong()} className="refreshButton">Refresh</button>
            </div>

            <div className="selectedButtons">
                <div className="flex">
                    <button onClick={()=>checkButton(song1)}>{song1}</button>
                    <button onClick={()=>checkButton(song2)}>{song2}</button>
                </div>
                <div className="flex">
                    <button onClick={()=>checkButton(song3)}>{song3}</button>
                    <button onClick={()=>checkButton(song4)}>{song4}</button>
                </div>
            </div>
        </div>
        </>)
}