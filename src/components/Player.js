import { useState, useEffect } from "react"
import SpotifyWebApi from 'spotify-web-api-node'
import { Container, Button } from "react-bootstrap"

export default function Player({ accessToken, trackUri }) {
 // const [play, setPlay] = useState(false)

 // useEffect(() => setPlay(true), [trackUri])

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