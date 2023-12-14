import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import { useState, useEffect } from 'react'
import PlayerProfile from '../components/PlayerProfile'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
};

/* 
http://localhost:3000/webapp#access_token=ABCqxL4Y&token_type=Bearer&expires_in=3600
*/

const Home= () => {
  const navigate = useNavigate();
  const [user_data, setUserData] = useState("");
  const [user_token, setUserToken] = useState("");

    useEffect(() => {
      const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(window.location.hash);
      window.localStorage.setItem('access_token', access_token);
      const token = window.localStorage.getItem('access_token')
      setUserToken(token);
      //update profile data when changed
      fetchProfile(token);

     }, []); //no dependencies, only runs on mount


    //grab profile data using token from login
    async function fetchProfile(token) {
      await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then( (response) => {
       // console.log(response.data)
        setUserData(response.data)
      })
      .catch((error) => {
        console.log(error.response);
      })
  }

    

    return(
    <div className="App">
      <Container>
        <h3 className="text-3xl font-bold underline">instructionss.. </h3>
        <PlayerProfile props={user_data}/>
        <button onClick={() => {
          navigate("/game")
        }}>Play</button>
        <button onClick={() => {
          navigate("/search")
        }}>Search</button>
        <button onClick={() => {
          navigate("/settings")
        }}>Settings</button>
      </Container>
    </div>
    )
}

export default Home;