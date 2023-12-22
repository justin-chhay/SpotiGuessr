import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card, CardBody} from 'react-bootstrap';
import { useState, useEffect } from 'react'
import Player from '../components/Player';
import SearchBar from '../components/SearchBar'
import axios from 'axios'
import { getToken } from '../Services/spotifyAuth'

function Game() {
  var accessToken = getToken();
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  let chosenTracks = [];

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
    if (userPlaylists.length === 0) return //so it doesnt access it when no data
    let n = userPlaylists.length;
    let chosenIndex = Math.floor(Math.random() * n);
    var chosenPlaylist = userPlaylists[chosenIndex].id;
    getTracks(chosenPlaylist);
  }

  async function getTracks(playlist_id) {
    let endpoint = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`; // limited to 100
  
    try {
      do {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        for (const item of response.data.items) {
          const track = item.track;
          tracks.push(track);
        }
  
        endpoint = response.data.next; // go to the next 100 songs
      } while (endpoint);
  
      console.log(tracks);
      getNRandomSongs();
    } catch (error) {
      console.error("Error fetching tracks:", error);
      // Handle errors here
    }
  }

  function getNRandomSongs() {
    let n = 5; // should be configurable in settings later on
    let playlistSize = tracks.length
    if (chosenTracks.length !== 0) {
      chosenTracks = [];
      return;
    }
    let chosenIndex = -1;
  
    for (let i = 0; i < n; i++) {
      chosenIndex = Math.floor(Math.random() * (playlistSize - i));
      chosenTracks.push(tracks[chosenIndex]);
      tracks.splice(chosenIndex, 1);
    }
   // console.log('*****')
    setTracks(chosenTracks);
    localStorage.setItem('currentSongId',chosenTracks[0].id)
    localStorage.setItem('currentSongName',chosenTracks[0].name)
   // console.log('test')
    //console.log(tracks)
  }
  
  useEffect(() => {
    if (!getToken()) return
    accessToken = getToken();
  }, [accessToken])

  useEffect(() => {
    getUserPlaylists();
  },[]);

  useEffect(() => {
    getRandomPlaylist();
  }, [userPlaylists]);


  return (
    <div className = "text-white h-screen w-screen items-center">
      <h1 className='text-center m-3 underline'>Game</h1>
      <Player selectedSongs={tracks}/>
      <SearchBar/>

    </div>
  );
}

export default Game;