import React from "react";
import { Header } from "./Header";
// https://www.youtube.com/watch?v=wBq3HCvYfUg
//https://discoverquickly.com/

export const CLIENT_ID = 'a36fba8567644702b88f6cab02ecfffa'
export const REDIRECT_URI = 'http://localhost:3000'
// export const REDIRECT_URI = 'https://spotify-app-ulukbek.herokuapp.com'
export const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
export const RESPONSE_TYPE = 'token'
export const SCOPE = 'user-top-read streaming user-read-private user-read-email user-modify-playback-state'

export const Home = () => {


    return (<>
    <Header/>
    </>)
}