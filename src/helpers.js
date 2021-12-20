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

export const fillPlaylist = async (arr, playlistID, accessToken) => {
  // TODO: USE THIS LENGTH TO FEED A PROGRESS BAR THAT INDICATES USER THE 
  // PROGRESS OF THE OPERATION
  console.log(arr.length)

  const copy = [...arr]
  let tracks;
  if (copy.length > 0 && copy.length < 100) {
    tracks = {
      "uris": copy
    }
    // make axios request with copy
    const addTracks = await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
      tracks,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    )
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
    return fillPlaylist(copy, playlistID, accessToken)
  }
  return
}

export const addToCount = async () => {
  axios.get(`${BASE_URL}/count-add`).then((res) => {
    return;
  });
}

// export const transformAndConcat = (obj1, obj2) => {
//   const objToJson1 = JSON.stringify(obj1);
//   const objToJson2 = JSON.stringify(obj2);
//   const result = objToJson1.concat(objToJson2)
//   return result;
// }

// export const retrieveTracks = async (url, token, setState1, setState2) => {
//   const newPlaylists = axios
//     .post(`${url}/playlists`, { token })
//     .then((res) => {
//       setState1(true);
//       return res.data;
//     });

//   const newLikedTracks = axios
//     .post(`${url}/likedtracks`, {
//       token,
//     })
//     .then((res) => {
//       setState2(true);
//       return res.data;
//     });

//   const ready = async () => {
//     const playlists = await newPlaylists
//     const likedTracks = await newLikedTracks;
//     const result = Object.assign(likedTracks, playlists)
//     return result;
//     // return { playlists, likedTracks }
//   }
//   return ready();

//   // return newPlaylists;
// }

