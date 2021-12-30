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

// ---------
export const getTracks = async (
  request,
  access_token,
  setForRender,
  items = [],
) => {
  try {
    const solve = await request
    console.log(solve.data.next)
    if (solve.data.items) {
      solve.data.items.map((i) => items.push(i.track))
    }
    const formattedTracks = formatTracks(items)
    setForRender(formattedTracks)
    // Use recursion to retrieve all tracks from each playlist, 
    // DEV NOTE: comment out to retrieve only first 100 tracks from each PL.
    //-----------------------------------------------
    if (solve.data.next) {
      const newRequest = axios.get(
        solve.data.next,
        {
          headers: { Authorization: `Bearer ${access_token}` },
          responseType: 'json',
        }
      )
      return await getTracks(newRequest, access_token, setForRender, items)
    }
    //-----------------------------------------------
    // const formattedTracks = formatTracks(items)
    // setForRender(formattedTracks)
    return;
  } catch (e) {
    console.log(e)
    return { error: "getTracks" }
  }
}

export default function formatTracks(arr) {
  const obj = {}
  /* tracks that doesn't have an ID also seem to have a faulty uri, this breakes the Player and the 
    Export Playlist functionalities at frontend, so let's filter here and not send them to frontend.
    This causes, however, that a user that has an old track stored in a playlist won't see that track
    at Shuffle tracks list. 
    A discussion with the frontend is required in order to decide what to do with older tracks, an ideal solution
    would be to display them in the list but filter them from Player or Export Playlist, this approach will have to be 
    implemented at frontend. */
  arr.map((track, index) => {
    if (track.id) {
      obj[index] = {
        artists: track.artists.map((a) => a.name),
        title: track.name,
        uri: track.uri,
        id: track.id,
        albumUrl: track.album.images.length && track.album.images[2].url ?
          track.album.images[1].url : 'https://thumbs.dreamstime.com/b/spotify-logo-white-background-editorial-illustrative-printed-white-paper-logo-eps-vector-spotify-logo-white-background-206665979.jpg',
      }
    }
  })
  return obj
}


// export const getTracks = async (
//   request,
//   access_token,
// ) => {
//   try {
//     const solve = await request;
//     return { items: solve.data.items, next: solve.data.next }
//   } catch (e) {
//     console.log(e)
//     return { error: "getTracks function" }
//   }
// }

// -------------------------------------------


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