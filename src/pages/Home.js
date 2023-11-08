import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card, CardBody} from 'react-bootstrap';
import { useState, useEffect } from 'react'

const CLIENT_ID = 'ca073cbf6c134b2ab15feffa2b103ff5'
const CLIENT_SECRET = 'd280b618b12e4539859ab212fa633183'
const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/callback"
const SPACE_DELIMITER = "%20";
const SCOPES = ["user-read-currently-playing", "user-read-playback-state"];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

/* 
http://localhost:3000/webapp#access_token=ABCqxL4Y&token_type=Bearer&expires_in=3600
*/
const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    console.log(currentValue);
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
};

const Home= () => {
    useEffect(() => {
      if (window.location.hash) {
        const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(window.location.hash);
        console.log('hellooo')
        console.log(access_token)
        localStorage.clear();

        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("tokenType", token_type);
        localStorage.setItem("expiresIn", expires_in);

      }
    });

    const handleLogin = () => {
      window.location = `${SPOTIFY_AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    };

    return(
    <div className="App">
      <Container>
        <h3 className="text-3xl font-bold underline">instructionss.. pls login here</h3>
        <button onClick={handleLogin}>login to spotify</button>
      </Container>
    </div>
    )
}

export default Home;