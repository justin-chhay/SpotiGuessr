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
    <Container className="Audio w-screen items-center justify-center m-4">
      <div className="Audio">
        <h3 className="text-white mb-3">Guess the song:</h3>
         {/*Audio timer bar here*/}
      </div> 
      <div className="controls items-center">
        {console.log(trackUris)}
        <WebPlayback
          trackList={trackUris}
        />
      </div>
    </Container>
  );
};

export default Player;
