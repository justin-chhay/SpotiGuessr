import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import {handleLogin} from '../Services/spotifyAuth'

const Login = () => {

    return (
    <div className="App h-screen w-screen flex justify-center items-center">
        <Container className='text-center'>
          <h3 className="font-serif text-3xl font-bold text-white text-center mb-4">Test your knowledge on your own music taste! <br></br>How well do you know your favourite songs?</h3>
          <button className="font-mono bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
            onClick={handleLogin}>
            Login to Spotify
          </button>  
        </Container> 
    </div>
    )
}

export default Login;