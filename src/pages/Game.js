import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card, CardBody} from 'react-bootstrap';
import { useState, useEffect } from 'react'
import Player from '../components/Player';
import SearchBar from '../components/SearchBar'
import axios from 'axios'
import { getToken } from '../Services/spotifyAuth'

//1. grab random playlist from user DONE
//2. get palylist items with the playlsit id DONE
//2. grab 5/n random songs from playlist
//3. pass the list of those songs to play audio for into props of Player component

function Game() {
  var accessToken = getToken();
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [questionNo, setQuestionNo] = useState(0);

  async function getUserPlaylists() {
    var user_id = window.localStorage.getItem('user_id');
    // display chosen answer with id
    const endpoint = "https://api.spotify.com/v1/users/" + user_id + "/playlists"

    await axios.get(endpoint, {
        headers: {
          Authorization: "Bearer " + accessToken
        },
      }).then((response) => {
       // console.log(response.data)
        setUserPlaylists(response.data.items);
      })
  }

  function getRandomPlaylist() {
    if (userPlaylists.length == 0) return //so it doesnt access it when no data
    let n = userPlaylists.length;
    let chosenIndex = Math.floor(Math.random() * n);
    var chosenPlaylist = userPlaylists[chosenIndex].id;
    getTracks(chosenPlaylist);
  }

  async function getTracks(playlist_id){
    let endpoint = "https://api.spotify.com/v1/playlists/" + playlist_id + "/tracks"//limited to 100

    while(true){
      await axios.get(endpoint, {
        headers: {
          Authorization: "Bearer " + accessToken
        },
      }).then((response) => {
        console.log('tracksbeloww')
        for (const item of response.data.items) {
          const track = item.track;
          tracks.push(track);
          endpoint = response.data.next //go to next 100 songs
        }}
      )
       if (!endpoint) break;
    }
    console.log(tracks)
  }

  function getNRandomSongs(){
    let n = 5; //should be configurable in settings later on
    let playlistSize = tracks.length
    let chosenTracks = {};
    let chosenIndex = Math.floor(Math.random() * n);

  }

  useEffect(() => {
    if (!getToken()) return
    accessToken = getToken();
  }, [accessToken])
  

  useEffect(() => {
    getUserPlaylists();
  },[]);

  getRandomPlaylist();


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