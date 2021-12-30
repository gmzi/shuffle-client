import axios from 'axios';
const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

export const retrieveTracks = async (
  url,
  token,
  // setState1
) => {
  const newTracks = axios
    .post(url, { token })
    .then((res) => {
      // setState1(true);
      return res.data;
    });
  return newTracks;
}

export const fillPlaylist = async (arr, playlistID, accessToken, setExportedTracks) => {
  const copy = [...arr]
  let tracks;
  if (copy.length > 0 && copy.length < 100) {
    tracks = {
      "uris": copy,
      "position": 0,
    }
    // make axios request with copy
    const addTracks = await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
      tracks,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    )
    setExportedTracks(false)
    return
  }
  if (copy.length > 100) {
    tracks = {
      "uris": copy.length > 200 ? copy.splice(99, 100) : copy.splice(99, copy.length - 1)
    }
    const addTracks = await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
      tracks,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    )
    setExportedTracks(arr.length)
    return fillPlaylist(copy, playlistID, accessToken, setExportedTracks)
  }
  setExportedTracks(false)
  return
}

export const addToCount = async () => {
  axios.get(`${BASE_URL}/count-add`).then((res) => {
    return;
  });
}