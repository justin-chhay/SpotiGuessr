import React, { useState, useEffect } from 'react';
import { getToken } from '../Services/spotifyAuth';
import { Button } from 'react-bootstrap';
import axios from 'axios'

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

function WebPlayback(props) {

    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [current_track, setTrack] = useState(track);
    let accessToken = getToken();

    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(accessToken); },
                volume: 0.5
            });

            setPlayer(player);

            //Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            //Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            //Player State Changed
            player.addListener('player_state_changed', ( state => {

                if (!state) {
                    return;
                }

                setTrack(props.trackList[0]);
                setPaused(state.paused);

                player.getCurrentState().then( state => { 
                    (!state)? setActive(false) : setActive(true) 
                });

            }));

            player.connect();

        };
    }, []);

    async function playTrack1() {
        let endpoint = `https://api.spotify.com/v1/me/player/play`;
        
        try {
          const response = await axios.put(endpoint, {
            device_id: player.device_id,
            uris: props.trackList
          }, {
            headers: {
              'Authorization': `Bearer ` + accessToken, // Replace with your actual access token
              'Content-Type': 'application/json',
            },
          });
      
          console.log('Track played successfully:', response.data);
        } catch (error) {
          console.error('Error playing track:', error);
        }

        // Wait for 5 seconds
        setTimeout(() => {
            console.log("After 5 seconds");
            // Code to be executed after the delay

            let endpoint = `https://api.spotify.com/v1/me/player/pause`;
        
            try {
            const response = axios.put(endpoint, {
                device_id: player.device_id,
            }, {
                headers: {
                'Authorization': `Bearer ` + accessToken, // Replace with your actual access token
                'Content-Type': 'application/json',
                },
            });
        
            console.log('Track paused successfully');
            } catch (error) {
            console.error('Error pausing track:', error);
            }
        }, 3000);
      }
      

    if (!is_active) { 
        return (
            <>
                <div className="container">
                    <div className="main-wrapper">
                        <b> Instance not active. Transfer your playback using your Spotify app </b>
                    </div>
                </div>
            </>)
    } else {
        return (
            <>
                <div className="container">
                    <div className="main-wrapper">

                        <div className="now-playing__side">


                            <button className="btn-spotify" onClick={() => { player.previousTrack() }} >
                                &lt;&lt;
                            </button>
                            <Button className="btn-spotify" onClick={() => { playTrack1() }}>
                                Play
                            </Button>

                            <button className="btn-spotify" onClick={() => { player.nextTrack() }} >
                                &gt;&gt;
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default WebPlayback