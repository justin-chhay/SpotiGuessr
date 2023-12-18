import React from 'react'
import {Container, Form, Button} from 'react-bootstrap'
import { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import { getToken } from '../Services/spotifyAuth'
import TrackSearchResult from './TrackSearchResult'
import axios from 'axios'

const spotifyApi = new SpotifyWebApi({
  clientId: 'ca073cbf6c134b2ab15feffa2b103ff5',
});

const SearchBar = () => {
  const accessToken = getToken();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [chosenSong, setChosenSong] = useState([]);
 
  function handleChooseTrack(id) {
    // display chosen answer with id
    const endpoint = "https://api.spotify.com/v1/tracks/" + id
      axios.get(endpoint, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }).then( (response) => {
        setChosenSong(response.data)
      })

    //to close dropdown search results menu
    setSearchResults([])
  }
  useEffect(() => {
    if (!getToken())return
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken])

  //everytime accestoken or search query changes, update the search results
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    let cancel = false;

    spotifyApi.searchTracks(search).then(response => {
      if (cancel)
        return;
      setSearchResults(
        response.body.tracks.items.map(track => {
          const smallestAlbumImg = track.album.images.reduce((smallest,
          image) => {
            if (image.height < smallest.height) 
              return image
            return smallest
            }, track.album.images[0])
          
        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallestAlbumImg.url,
          id: track.id
        }
      }))
    }, [accessToken])

    return () => cancel = true
  }, [search, accessToken])

    return (
      <Container className='d-flex flex-column py-2' style={({
        height: "100vh"
      })}>
        {chosenSong.length !== 0 ? (
          <div className='YourAnswer text-white mt-3 mb-3'> 
            <img src={chosenSong.album.images[1].url}
            style={{height:"300px", width:"300px"}} alt="" />
            Your answer: {chosenSong.name} by {chosenSong.artists[0].name}
          </div>
        ) : (<>{console.log(chosenSong)}</> )
        }
          
        <Button className='mb-5'>
          Submit
        </Button>

        <Form.Control
            type = 'search'
            placeholder='Answer here'
            value={search}
            onChange={e => setSearch(e.target.value)}
        />
        <div className='flex-grow-1 my-2' style={{ overflowY: "auto"}}>
          {searchResults.map(track => (
            <TrackSearchResult 
              track={track}
              key={track.uri}
              onChooseTrack={handleChooseTrack}/>
          ))}
        </div>
      </Container>
    )
}
  
  export default SearchBar;