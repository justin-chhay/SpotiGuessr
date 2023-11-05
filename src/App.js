import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card, CardBody} from 'react-bootstrap';
import { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'

const CLIENT_ID = 'ca073cbf6c134b2ab15feffa2b103ff5'
const CLIENT_SECRET = 'd280b618b12e4539859ab212fa633183'
const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/callback"
const SPACE_DELIMITER = "%20";
const SCOPES = ["user-read-currently-playing", "user-read-playback-state"];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);


function App() {
  
  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  return (
    <React.Fragment>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/' element={<Login/>} />
      </Routes>
    </React.Fragment>
  )
};

export default App;
