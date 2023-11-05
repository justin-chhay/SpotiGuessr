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

function Search() {
    const [ searchInput, setSearchInput ] = useState("");
    const [ accessToken, setAccessToken] = useState("");
    const [ albums, setAlbums ] = useState([]);
    
    useEffect(() => {
      //API Access Token
      var authParams = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
  
      }
      fetch('http://accounts.spotify.com/api/token', authParams)
        .then(result => result.json())
        .then(data => setAccessToken(data.access_token))
    }, [])
  
    //Search, async bc we have a lot of fetch statements, need to wait to do sequentially
    async function search(){
      console.log("Search for " + searchInput);
  
      // Get request using search to get the Artist ID
      var searchParameters = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      }
      var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
      .then(response => response.json())
      .then(data => { return data.artists.items[0].id})
  
      // Get request w artist Id, grab all albums from artist
      var returnedAlbums= await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums'+ '?include_groups=album&market=US&limit=50', searchParameters)
      .then(response => response.json())
      .then(data => { 
        console.log(data);
        setAlbums(data.items);
      });
    }

    return(
    <div className="App">
      <Container>
        <h1 className="text-3xl font-bold underline">SpotiGuessr</h1>
        <button>login to spotify</button>
      </Container>
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="search for artist"
            type="input" // Use "text" for text input
            onKeyPress={event => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>
            Search
          </Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className='mx-2 row row-cols-4'>
          {albums.map( (album, i) => {
            return (
              <Card key={album.id}>
                <Card.Img src={album.images[0].url}/>
                <Card.Body>
                  <Card.Title>{album.name}</Card.Title>
                </Card.Body>
              </Card>
            )})
          }

        </Row>
      </Container>
    </div>
    )
}

export default Search