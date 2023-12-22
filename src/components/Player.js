import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import axios from 'axios';
import WebPlayback from "./WebPlayback";

const Player = (props) => {
  let selectSongs = props.selectedSongs;
  const [trackUris, setTrackUris] = useState(new Array(5).fill(""));
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    try{
      let newTrackUris = [];
      //console.log(selectSongs)
      for (let i = 0; i < 5; i++) {
        newTrackUris.push(selectSongs[i].uri);
      }
     // console.log(newTrackUris)
      setTrackUris(newTrackUris);
     // console.log(trackUris)
    } catch(error){
    }
    //setTrackUris([...selectSongs]);
  }, [selectSongs]); //whenever selected songs changes

  return ( 
    <Container>
      <div className="Audio">
        <h1 className="text-white">Guess the song</h1>
         {/*Audio timer bar here*/}
      </div> 
      <div className="controls">
        {console.log(trackUris)}
        <Button className="mr-3">Play</Button>
        <Button className="ml-3">Stop</Button>
        <WebPlayback
          trackList={trackUris}
        />
      </div>
    </Container>
  );
};

export default Player;
