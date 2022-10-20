import React from "react";
import { Header } from "./Header";
// https://www.youtube.com/watch?v=wBq3HCvYfUg
//https://discoverquickly.com/
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import LoginIcon from '@mui/icons-material/Login';

export const Home = () => {
    const AutoplaySlider = withAutoplay(AwesomeSlider);
    return (<>
        <Header/>
        <div className="homeContainer noselect">
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
                        <img src="https://audiohype.io/wp-content/uploads/2020/09/The-Best-Spotify-Playlists.png" className="textLoad"/>
                    </div>
                    {/* <AutoplaySlider
                        play={true}
                        cancelOnInteraction={false} // should stop playing on user interaction
                        interval={3000}
                        bullets={false}
                        organicArrows={false}
                    >
                        <div data-src="https://wallpaperaccess.com/full/49494.jpg" />
                        <div data-src="https://wallpaperaccess.com/full/49494.jpg" />
                        <div data-src="https://wallpaperaccess.com/full/49494.jpg" />
                    </AutoplaySlider> */}
                </div>
            </div>
            
            <div className="homePart">

                <h1>How to Play:</h1>
                <div className="howToPlayContainer">
                    <div className="howToPlay">
                        <div className="playInstruction instruction">
                            <div>
                                <h2>Step 1:</h2>
                                <div> 
                                    {/* <LoginIcon/> */}
                                    <p>Login with your Spotify Account.</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            
                        </div>
                        <div className="playInstructionCenter instruction">
                            <div>
                            <h2>Step 2:</h2>
                            <p>Browse through publically available playlists.</p>
                            </div>
                        </div>
                        <div className="playInstruction instruction">
                            <div>
                            <h2>Step 3:</h2>
                            <p>Select a playlist and test your music knowledge!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}