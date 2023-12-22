import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react'
import UserProfile from '../components/UserProfile'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {grabToken, getToken} from '../Services/spotifyAuth'

const Home= () => {
  const navigate = useNavigate();
  const [user_data, setUserData] = useState("");

    useEffect(() => {
      grabToken();
      const token = getToken();
      fetchProfile(token);
     }, []); //no dependencies, only runs on mount

    //grab profile data using token from login
    async function fetchProfile(token) {
      await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then( (response) => {
       //console.log(response.data)
        setUserData(response.data)
        window.localStorage.setItem('user_id', response.data.id);
      })
      .catch((error) => {
        console.log(error.response);
      })
  }

    return(
    <div className="App text-white h-screen w-screen flex justify-center items-center">
      <Container className='m-5'>
        <h3 className="text-3xl font-bold underline mt-5">Welcome back </h3>
        <UserProfile props={user_data}/>
      </Container>
      <Container >
          <Button className='bg-white text-black m-3' onClick={() => {
              navigate("/game")
            }}>Play</Button>

            <Button className='bg-white text-black m-3' onClick={() => {
              navigate("/search")
            }}>Search</Button>

            <Button className='bg-white text-black m-3' onClick={() => {
              //delete access token
              setUserData(null);
              window.localStorage.removeItem('access_token');
              window.localStorage.removeItem('user_id');
              //redirect to login page
              navigate("/");
            }}>Logout</Button>
            
        </Container>
    </div>
    )
}

export default Home;