import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button} from 'react-bootstrap';
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
    <div className="App text-white">
      <Container>
        <h3 className="text-3xl font-bold underline mt-5">Welcome </h3>
        <PlayerProfile props={user_data}/>
      </Container>
      <div className='Menu'>
        <Container>
          <Button className='bg-white text-black' onClick={() => {
              navigate("/game")
            }}>Play</Button>
          </Container>
          <Container>
            <Button className='bg-white text-black' onClick={() => {
              navigate("/search")
            }}>Search</Button>
          </Container>
          <Container>
            <Button className='bg-white text-black' onClick={() => {
              navigate("/settings")
            }}>Settings</Button>
          </Container>
          <Container>
            <Button className='bg-white text-black' onClick={() => {
              //delete access token
              setUserData(null);
              setUserToken(null);
              window.localStorage.removeItem('access_token');
              //redirect to login page
              navigate("/");
            }}>Logout</Button>
          </Container>
        </div>
    </div>
    )
}

export default Home;