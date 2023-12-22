import 'bootstrap/dist/css/bootstrap.min.css';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/home/"
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-currently-playing", 
  "user-read-playback-state",
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "user-library-modify",
  "user-read-playback-state",
  "user-modify-playback-state"];

const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);


const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});
  
    return paramsSplitUp;
  };

export const handleLogin = () => {
      window.location = `${SPOTIFY_AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPES_URL_PARAM}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&response_type=token&show_dialog=true`;
};

export function getToken(){
  return window.localStorage.getItem('access_token');
}

export function refreshToken(){
  return window.localStorage.getItem('access_token');
}

export const grabToken = () => {
    const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(window.location.hash);

    window.localStorage.setItem('access_token', access_token);
    window.localStorage.setItem('expires_in', expires_in);
}