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
import {fetchData, putData, updateData} from './AwsFunctions';
import AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()

export const Item3 = () => {
    const [token, setToken] = useState("")
    const [score, setScore] = useState(0)
    const [playlist, setPlaylist] = useState("")

    // const [database, setDatabase] = useState("")
    const [highscore, setHighscore] = useState(0)
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
        pickNumber(data)
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

        playAudio(data.tracks.items[arr[0]].track.preview_url)
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
        if(canRun === true) {
            toggleCanRun()
            const correct = document.getElementById(answer);
            correct.classList.add("correctSong")
    
            if(title === answer) {
                setScore(score+1)
                setTimeout(function(){
                    correct.classList.remove("correctSong")
                    newSong()
                }, 2000);
            } else {
                const wrong = document.getElementById(title);
                wrong.classList.add("wrongSong")

                if(highscore === 0 && score > 0) {
                    addData()
                } else if (highscore > 0 && score > highscore) {
                    console.log('update database')
                    // updateData()
                }

                setScore(0)
                setTimeout(function(){
                    correct.classList.remove("correctSong")
                    wrong.classList.remove("wrongSong")
                    newSong()
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

    const getData = (tableName,id) => {
        var params = {
            TableName: tableName
        }
    
        docClient.scan(params, function (err, data) {
            if (!err) {
                console.log(data)
                for(var i = 0; i < data.Items.length; i++) {
                    if(data.Items[i].playlistID === id) {
                        console.log('same!')
                        setHighscore(data.Items[i].score)
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
        
        await putData('Leaderboard' , userData)
        // getData('Leaderboard', playlistID)
        setHighscore(score)
    }

    const updateData = async () => {
        await updateData('Leaderboard' , playlistID, score, userName)
        // getData('Leaderboard', playlistID)
        setHighscore(score)
    }



    return(<>
        <Header/>
        <div className="selectedContainer">
            <div>
                <h1>{playlist.name}</h1>
                <h3>Highscore: {highscore}</h3>
                <h3>Score: {score}</h3>
            </div>

            <div>
                <img width={"250rem"} src={url} alt=""/>
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


            {/* <div>
                <button onClick={()=>newSong()} className="refreshButton">Refresh</button>
            </div> */}

            <div className="selectedButtons">
                <div className="flex">
                    <div className="" id={song1}>
                        <button onClick={()=>checkButton(song1)}>{song1}</button>
                    </div>
                    <div className="" id={song2}>
                        <button onClick={()=>checkButton(song2)}>{song2}</button>
                    </div>
                </div>
                <div className="flex">
                    <div className="" id={song3}>
                        <button onClick={()=>checkButton(song3)}>{song3}</button>
                    </div>
                    <div className="" id={song4}>
                        <button onClick={()=>checkButton(song4)}>{song4}</button>
                    </div>
                </div>
            </div>
        </div>
        </>)
}