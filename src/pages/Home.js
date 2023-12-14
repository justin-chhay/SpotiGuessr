import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card, CardBody} from 'react-bootstrap';
import { useState, useEffect } from 'react'

/* 
http://localhost:3000/webapp#access_token=ABCqxL4Y&token_type=Bearer&expires_in=3600
*/

const Home= () => {
    useEffect(() => {

    });

    return(
    <div className="App">
      <Container>
        <h3 className="text-3xl font-bold underline">instructionss.. pls login here</h3>
        <button >Play</button>
        <button>Score</button>
      </Container>
    </div>
    )
}

export default Home;