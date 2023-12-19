import { useState, useEffect } from "react"
import SpotifyWebApi from 'spotify-web-api-node'
import { Container, Button } from "react-bootstrap"

const Player = (props) => {

  // HERE GRAB THE AUDIO FOR THE SONGS RANDOMY SELECTED

 // const [play, setPlay] = useState(false)

 // useEffect(() => setPlay(true), [trackUri])

 /*
  useEffect(() => {
    // Function to play 5-second audio snippets
    const playAudioSnippet = () => {
      const audio = new Audio(tracks[currentTrackIndex].preview_url);
      audio.play();

      setTimeout(() => {
        audio.pause();
        setCurrentTrackIndex((prevIndex) =>
          prevIndex === tracks.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    };

    if (tracks.length > 0) {
      playAudioSnippet();
    }
  }, [currentTrackIndex, tracks]);*/

 // if (!accessToken) return null
  return (
    <Container>
      <div className="Audio">
        <h1 className="text-white">
          Guess the song
        </h1>

        Audio Waveformw ith animation hereee
      </div>
      <div className="controls">
        <Button className="mr-3">Play</Button>{/* Play audio clip from beginning */}
        <Button className="ml-3">Stop</Button>
      </div>
    </Container>
  )
}         

export default Player;