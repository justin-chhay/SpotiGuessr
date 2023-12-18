import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react'
import UserProfile from '../components/UserProfile'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {grabToken, getToken} from '../Services/spotifyAuth'

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

    useEffect(() => {
      grabToken();
      const token = getToken();
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
        <UserProfile props={user_data}/>
      </Container>
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
              window.localStorage.removeItem('access_token');
              //redirect to login page
              navigate("/");
            }}>Logout</Button>
        </Container>
    </div>
    )
}

export default Home;