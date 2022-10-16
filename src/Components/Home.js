import React from "react";
import { Header } from "./Header";
// https://www.youtube.com/watch?v=wBq3HCvYfUg
//https://discoverquickly.com/

export const Home = () => {

    return (<>
        <Header/>
        <div className="homeContainer">
            <div className="homeLanding">
                <div className="homeLandingLeft">
                    <h1 className="textLoad">Guessify</h1>
                    <h2 className="textLoad">The Spotify Song Guessing Game.</h2>
                    <h4 className="textLoad">Test how well you know your music and compete against others.</h4>
                    <h4 className="textLoad">Choose from a selection of hundrends of playlists.</h4>
                    <h4 className="textLoad">Check your top artists and tracks.</h4>
                </div>
                <div className="homeLandingRight">
                    <div className="homeImageAnimation">
                        <img src="https://i.imgur.com/5ahv4a9.png" className="textLoad"/>
                    </div>
                </div>
            </div>
            
            {/* <div className="homePart">

                <h1>How to Play:</h1>
                <div className="howToPlayContainer">
                    <div className="howToPlay">
                        <div className="playInstruction">

                        </div>
                        <div className="playInstruction">

                        </div>
                        <div className="playInstruction">

                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    </>)
}