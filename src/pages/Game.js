import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card, CardBody} from 'react-bootstrap';
import { useState, useEffect } from 'react'
import Player from '../components/Player';
import SearchBar from '../components/SearchBar'

//grab snippets of songs from user playlist
//webplayback sdk
//also need to


function Game() {
  const [accessToken, setAccessToken] = useState(null);
  const [playlistId, setPlaylistId] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [questionNo, setQuestionNo] = useState(0);

  useEffect(() => {
    setAccessToken(window.localStorage.getItem('access_token'));
   // spotifyApi.setAccessToken(accessToken);
  });

  useEffect(() => {
    // Function to fetch playlist tracks
    const fetchPlaylistTracks = async () => {
      try {
     //   const response = await spotifyApi.getPlaylistTracks(playlistId);
      //  setTracks(response.items.map((item) => item.track));
     //   console.log(response);
      } catch (error) {
        console.error('Error fetching playlist tracks', error);
      }
    };

    if (accessToken && playlistId) {
    //  fetchPlaylistTracks();
    }
  }, [accessToken, playlistId]);
/*
  useEffect(() => {
    // Function to play 5-second audio snippets
    const playAudioSnippet = () => {
      const audio = new Audio(tracks[currentTrackIndex].preview_url);
      audio.play();

      setTimeout(() => {
        audio.pause();
        setCurrentTrackIndex((prevIndex) =>
          prevIndex === tracks.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    };

    if (tracks.length > 0) {
      playAudioSnippet();
    }
  }, [currentTrackIndex, tracks]);*/

  return (
    <div className = "text-white">
      <h1 className='text-center m-3'>Game</h1>
      <h2 className='text-center m-6'>Round #{questionNo}</h2>
      
      <Player/>
      <SearchBar/>

    </div>
  );
}

export default Game;







/*
window.onSpotifyWebPlaybackSDKReady = () => {
  const token = '[My access token]';
  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(token); },
    volume: 0.5
    });}

const Game = () => {
  useEffect(() => {
    });


    return (
      
    <div className="App text-white">
      <script src="https://sdk.scdn.co/spotify-player.js"></script>
        <Container>
          <h3 className="text-3xl font-bold underline">Gameee</h3>
        </Container> 
    </div>
    )
}

export default Game;*/