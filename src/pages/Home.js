import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card, CardBody} from 'react-bootstrap';
import { useState, useEffect } from 'react'
import PlayerProfile from '../components/PlayerProfile'
import { useNavigate } from "react-router-dom";


/* 
http://localhost:3000/webapp#access_token=ABCqxL4Y&token_type=Bearer&expires_in=3600
*/

const Home= () => {
  const navigate = useNavigate();

    useEffect(() => {
      //update profile data every refresh on homepage
      fetchProfile();


    });


    //grab profile data using token from login
    async function fetchProfile() {
      console.log("HELLLOO")
      let _token = window.localStorage.getItem('access_token')
      console.log(_token);
      const result = await fetch("https://api.spotify.com/v1/me", {
          method: "GET", headers: { Authorization: `Bearer ${_token}` }
      });
      return await result.json();
  }

    

    return(
    <div className="App">
      <Container>
        <h3 className="text-3xl font-bold underline">instructionss.. </h3>
        <PlayerProfile props={fetchProfile}/>
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