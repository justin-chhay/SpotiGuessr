# SpotiGuessr 🎵🤔

A React web app that tests the player on their personal Spotify playlist knowledge via short audio snippets in a time-based game.

## Technologies Used
> ReactJS, TailwindCSS, Spotify Web API, Spotify Web Playback SDK

## Getting Started

Clone the repository to your local machine with `git clone`

To install all dependencies within the root folder, paste this in your terminal
### `npm install`

Run the project on localhost:3000
### `npm start`

## Navigating through the App
Upon login, you must authenticate your Spotify account as it is required for SpotiGuessr to be able to access your playlist data and user information. Keep in mind a premium account is required to allow playback of audio through the API!
![loginPage](./src/images/loginPage.png)
![spotifyAuthPage](./src/images/spotifyAuthPage.png)

Through the homepage you have the options to play a round, search through your playlists, or logout of the application.
![HomePage](./src/images/homePage.png)

In the game, you may need to first transfer the playback from your personal device to SpotiGuessr so it can play audio. Pressing play will play a short audio clip of a song from your personal playlist, from where you will need to guess the song within the search bar. You have multiple attempts!

## Video Demo of the Game v1.0
![game1](./src/images/gameScreenshotPart1.png)
![game2](./src/images/gameScreenshotPart2.png)

[![v1.0 SpotifyGuessr Game Demo]         
(https://i9.ytimg.com/vi/37P4sBEBP3o/mqdefault.jpg?sqp=CLjQlKwG-oaymwEmCMACELQB8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgZShlMA8=&rs=AOn4CLAjyYwzb_Y14WVbdW8rkQ_qbTeGAw)] 
(https://youtu.be/37P4sBEBP3o "SpotifyGuessr Game Demo")  

## To Do
- clean up refresh token logic
- add more animations for page and button transition
- scale game to multiple levels/songs

