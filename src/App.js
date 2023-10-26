import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card, CardBody} from 'react-bootstrap';
import { useState, useEffect } from 'react'

const CLIENT_ID = 'ca073cbf6c134b2ab15feffa2b103ff5'
const CLIENT_SECRET = 'd280b618b12e4539859ab212fa633183'
function App() {
  const [ searchInput, setSearchInput ] = useState("");

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
      .then(data => console.log(data))
  }, [])

  return (
    <div className="App">
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="search for artist"
            type="input" // Use "text" for text input
            onKeyPress={event => {
              if (event.key == "Enter") {
                console.log("Pressed Enter");
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={() => {console.log("clicked button")}}>
          </Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className='mx-2 row row-cols-4'>
          <Card>
            <Card.Img src="#"/>
            <Card.Body>
              <Card.Title>Album Name Here</Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img src="#"/>
            <Card.Body>
              <Card.Title>Album Name Here</Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img src="#"/>
            <Card.Body>
              <Card.Title>Album Name Here</Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img src="#"/>
            <Card.Body>
              <Card.Title>Album Name Here</Card.Title>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default App;
