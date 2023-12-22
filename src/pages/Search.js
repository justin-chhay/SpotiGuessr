import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import { useState, useEffect } from 'react'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET

const Search = () => {
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

    async function search(){
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

      var returnedAlbums= await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums'+ '?include_groups=album&market=US&limit=50', searchParameters)
      .then(response => response.json())
      .then(data => { 
        setAlbums(data.items);
      });
    }

    return(
    <div className="App h-screen w-screen">
      <Container className='mt-5'>
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