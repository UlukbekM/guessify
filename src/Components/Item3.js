import React,{useState, useEffect} from "react";
import { useLocation } from 'react-router-dom'
import { Header } from "./Header";
import axios from 'axios';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export const Item3 = () => {
    const [token, setToken] = useState("")
    const [score, setScore] = useState(0)
    const [playlist, setPlaylist] = useState("")

    const [songUrl, setSongUrl] = useState("")
    const [answer, setAnswer] = useState("")
    const [song1, setSong1] = useState("")
    const [song2, setSong2] = useState("")
    const [song3, setSong3] = useState("")
    const [song4, setSong4] = useState("")

    const [volume, setVolume] = useState(20);

    const location = useLocation()
    const { playlistID } = location.state

    const handleChange = (event, newValue) => {
        setVolume(newValue);
    };

    useEffect(() => {
        let player = document.getElementById('audioPlayer')
        // player.currentTime = 0
        player.play()
        console.log('change!')
    },[songUrl]) // <-- here put the parameter to listen

    useEffect(() => {
        let player = document.getElementById('audioPlayer')
        player.volume = volume/100
        console.log('change!')
    },[volume]) // <-- here put the parameter to listen

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
        setAnswer(data.tracks.items[arr[0]].track.name)

        var containerArray = []
        containerArray.push(data.tracks.items[arr[0]].track.name)
        containerArray.push(data.tracks.items[arr[1]].track.name)
        containerArray.push(data.tracks.items[arr[2]].track.name)
        containerArray.push(data.tracks.items[arr[3]].track.name)

        containerArray.sort(() => Math.random() - 0.5);

        setSong1(containerArray[0])
        setSong2(containerArray[1])
        setSong3(containerArray[2])
        setSong4(containerArray[3])
    }

    const newSong = () => {
        var arr = [];
        while(arr.length < 4){
            var r = Math.floor(Math.random() * playlist.tracks.total);
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        setSongUrl(playlist.tracks.items[arr[0]].track.preview_url)
        setAnswer(playlist.tracks.items[arr[0]].track.name)
        
        var containerArray = []
        containerArray.push(playlist.tracks.items[arr[0]].track.name)
        containerArray.push(playlist.tracks.items[arr[1]].track.name)
        containerArray.push(playlist.tracks.items[arr[2]].track.name)
        containerArray.push(playlist.tracks.items[arr[3]].track.name)

        containerArray.sort(() => Math.random() - 0.5);

        setSong1(containerArray[0])
        setSong2(containerArray[1])
        setSong3(containerArray[2])
        setSong4(containerArray[3])
    }

    const checkButton = (title) => {
        if(title === answer) {
            setScore(score+1)
            newSong()
        } else {
            setScore(0)
            newSong()
        }
    }


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
                {/* <h1>{song1}</h1> */}
                <audio id="audioPlayer" src={songUrl}></audio>
                <div className="slider">
                <VolumeDown />
                    <Slider aria-label="Volume" value={volume} onChange={handleChange}/>
                <VolumeUp />
                </div>
            </div>


            {/* <div>
                <button onClick={()=>newSong()} className="refreshButton">Refresh</button>
            </div> */}

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