import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import {useEffect } from 'react'


const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/home/"
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-currently-playing", 
  "user-read-playback-state",
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "user-library-modify",
  "user-read-playback-state",
  "user-modify-playback-state"];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);


const Login = () => {
  useEffect(() => {

    });

    const handleLogin = () => {
      window.location = `${SPOTIFY_AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPES_URL_PARAM}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&response_type=token&show_dialog=true`;
    };

    return (
    <div className="App">
        <Container>
          <h3 className="text-3xl font-bold underline text-white">Test your knowledge on your own music taste! How well do you know your favourite songs?</h3>
          <button className='text-white' onClick={handleLogin}>Login To Spotify</button>
        </Container> 
    </div>
    )
}

export default Login;