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
import {fetchData, putData, updateItem} from './AwsFunctions';
import AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()

export const Item3 = () => {
    const [token, setToken] = useState("")
    const [score, setScore] = useState(0)
    const [playlist, setPlaylist] = useState("")
    const [status, setStatus] = useState("not playing")


    // const [database, setDatabase] = useState("")
    const [highscore, setHighscore] = useState(0)
    const [highscoreName, setHighscoreName] = useState("")
    const [userName, setUserName] = useState("")

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
        player.volume = volume/100
        // console.log('change!')
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
        getUser(token)
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
        // console.log(data)
        // pickNumber(data)
        getData('Leaderboard',data.id)
    }

    const getUser = async (tempToken) => {
        const {data} = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${tempToken}`
            }
        })
        setUserName(data.display_name)
        // console.log(data)
    }

    let url = ''
    if(playlist.images != null) {
        url = playlist.images[0].url
    }

    const pickNumber = (data) => {
        var arr = [];
        let totalSongs = data.tracks.total
        if(totalSongs > 100) totalSongs = 100
        while(arr.length < 4){
            var r = Math.floor(Math.random() * totalSongs);
            if(arr.indexOf(r) === -1 && data.tracks.items[r] !== undefined) 
            arr.push(r);
        }
        setSongUrl(data.tracks.items[arr[0]].track.preview_url)
        setAnswer(data.tracks.items[arr[0]].track.name)

        var containerArray = []
        for(let i = 0; i < arr.length; i++) {
            containerArray.push(data.tracks.items[arr[i]].track.name)
        }

        containerArray.sort(() => Math.random() - 0.5);
        
        
        setSong1(containerArray[0])
        setSong2(containerArray[1])
        setSong3(containerArray[2])
        setSong4(containerArray[3])

        // console.log(data.tracks.items[arr[0]].track.preview_url)
        playAudio(data.tracks.items[arr[0]].track.preview_url)
    }

    // let playedSongs = []

    const newSong = () => {
        // if(playedSongs.length === )
        var arr = [];
        while(arr.length < 4){
            var r = Math.floor(Math.random() * playlist.tracks.total);
            // if(arr.length === 0) {
            //     if(!playedSongs.includes(playlist.tracks.items[r].track.name)) {
            //         if(arr.indexOf(r) === -1 && playlist.tracks.items[r] !== undefined && playlist.tracks.items[r].track.preview_url !== null) 
            //             arr.push(r);
            //     }
            // } else {
                if(arr.indexOf(r) === -1 && playlist.tracks.items[r] !== undefined && playlist.tracks.items[r].track.preview_url !== null) 
                    arr.push(r);
            // }
        }
        setSongUrl(playlist.tracks.items[arr[0]].track.preview_url)
        setAnswer(playlist.tracks.items[arr[0]].track.name)
        
        var containerArray = []
        for(let i = 0; i < arr.length; i++) {
            containerArray.push(playlist.tracks.items[arr[i]].track.name)
        }

        containerArray.sort(() => Math.random() - 0.5);

        setSong1(containerArray[0])
        setSong2(containerArray[1])
        setSong3(containerArray[2])
        setSong4(containerArray[3])

        // let song = document.getElementById(containerArray[0]);
        // song.classList.add("buttonHover")
        // song = document.getElementById(containerArray[1]);
        // song.classList.add("buttonHover")
        // song = document.getElementById(containerArray[2]);
        // song.classList.add("buttonHover")
        // song = document.getElementById(containerArray[3]);
        // song.classList.add("buttonHover")

        // console.log(playlist.tracks.items[arr[0]].track.preview_url)
        playAudio(playlist.tracks.items[arr[0]].track.preview_url)
    }

    var canRun = true
    const toggleCanRun = () => {
        if(canRun) {
            canRun = false
        } else {
            canRun = true
        }
    }
    const checkButton = (title) => {
        if(canRun === true && status === "playing") {
            toggleCanRun()
            const correct = document.getElementById(answer);
            correct.classList.add("correctSong")
            correct.classList.remove("buttonHover")
    
            if(title === answer) {
                setScore(score+1)
                setTimeout(function(){
                    correct.classList.remove("correctSong")
                    correct.classList.add("buttonHover")
                    newSong()
                }, 2000);
            } else {
                const wrong = document.getElementById(title);
                wrong.classList.add("wrongSong")
                wrong.classList.remove("buttonHover")

                if(highscore === 0 && score > 0) {
                    addData()
                } else if (highscore > 0 && score > highscore) {
                    // console.log('update database')
                    updateData()
                }

                setScore(0)
                setTimeout(function(){
                    correct.classList.remove("correctSong")
                    correct.classList.add("buttonHover")
                    wrong.classList.remove("wrongSong")
                    wrong.classList.add("buttonHover")
                    // newSong()
                    setStatus("not playing")
                    stopAudio()
                }, 2000);
            }
        } else {
            return
        }

    }

    const playAudio = (url) => {
        var player = document.getElementById('audioPlayer')
        // console.log(player.pause)
        // player.volume=
        player.src = url
        player.play()
    }

    const stopAudio = () => {
        var player = document.getElementById('audioPlayer')
        player.pause()
        setSong1("")
        setSong2("")
        setSong3("")
        setSong4("")

        // let song = document.getElementById(song1);
        // song.classList.remove("buttonHover")
        // song = document.getElementById(song2);
        // song.classList.remove("buttonHover")
        // song = document.getElementById(song3);
        // song.classList.remove("buttonHover")
        // song = document.getElementById(song4);
        // song.classList.remove("buttonHover")
    }

    const getData = (tableName,id) => {
        var params = {
            TableName: tableName
        }
    
        docClient.scan(params, function (err, data) {
            if (!err) {
                // console.log(data)
                for(var i = 0; i < data.Items.length; i++) {
                    if(data.Items[i].playlistID === id) {
                        // console.log(data.Items[i].userName)
                        setHighscore(data.Items[i].score)
                        setHighscoreName(data.Items[i].userName)
                    }
                }
            } else {
                console.log(err)
            }
        })
    }

    const addData = async () => {
        const userData = {
            playlistID: playlistID,
            score: score,
            userName: userName
        }
        
        putData('Leaderboard' , userData)
        // getData('Leaderboard', playlistID)
        setHighscore(score)
    }

    const updateData = async () => {
        const userData = {
            playlistID: playlistID,
            score: score,
            userName: userName
        }
        updateItem(userData)
        // getData('Leaderboard', playlistID)
        setHighscore(score)
        setHighscoreName(userName)
    }

    const startGame = () => {
        if(status !== "playing") {
            setStatus("playing")
            newSong()
        }
    }

    return(<>
        <Header/>
        <div className="headerSpace"/>
        <div className="selectedContainer">
            <div>
                <h1>{playlist.name}</h1>
                <h3>Highscore: {highscore} 
                    {highscoreName !== "" ? " -"+ `${highscoreName}`
                    : <></>}
                </h3>
                <h3>Score: {score}</h3>
            </div>

            <div className="playImage">
                <img width={"250rem"} height={"250rem"}src={url} alt=""/>
            </div>

            <div>
                {/* <h1>{song1}</h1> */}
                <audio id="audioPlayer"></audio>
                <div className="slider">
                <VolumeDown />
                    <Slider aria-label="Volume" value={volume} onChange={handleChange}/>
                <VolumeUp />
                </div>
            </div>

            <div className="playButton">
                <button onClick={() => startGame()}>Play</button>
            </div>

            <div className="selectedButtons">
            <div className="flex">
                <div className="buttonChoice buttonHover" id={song1}>
                    <button onClick={()=>checkButton(song1)}>{song1}</button>
                </div>
                <div className="buttonChoice buttonHover" id={song2}>
                    <button onClick={()=>checkButton(song2)}>{song2}</button>
                </div>
            </div>
            <div className="flex">
                <div className="buttonChoice buttonHover" id={song3}>
                    <button onClick={()=>checkButton(song3)}>{song3}</button>
                </div>
                <div className="buttonChoice buttonHover" id={song4}>
                    <button onClick={()=>checkButton(song4)}>{song4}</button>
                </div>
            </div>
            </div>
            
        </div>
        </>)
}