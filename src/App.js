import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';


function App() {
  return (
    <div className="App">
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="search for artist"
            type="text" // Use "text" for text input
            handleKeyPress={event => {
              if (event.key === "Enter") {
                console.log("Pressed Enter");
              }
            }}
          />
        </InputGroup>
      </Container>
    </div>
  );
}

export default App;
