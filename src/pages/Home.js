import React from 'react'
import Navbar from '../components/Navbar'
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

function Home() {


    return(
    <div className="App">
      <Container>
        <h1 className="text-3xl font-bold underline">SpotiGuessr</h1>
        <button>login to spotify</button>
      </Container>
    </div>
    )
}

export default Home