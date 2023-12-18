import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import {handleLogin} from '../Services/spotifyAuth'

const Login = () => {

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