import axios from 'axios';
const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

export const retrieveTracks = async (url, token, setState1, setState2) => {
  const newPlaylists = axios
    .post(`${url}/playlists`, { token })
    .then((res) => {
      setState1(true);
      return res.data;
    });

  const newLikedTracks = axios
    .post(`${url}/likedtracks`, {
      token,
    })
    .then((res) => {
      setState2(true);
      return res.data;
    });

  // const ready = async () => {
  //   const playlists = await newPlaylists
  //   const likedTracks = await newLikedTracks;
  //   return { playlists, likedTracks }
  // }
  // return ready();
  return newPlaylists;
}

export const likedOnly = async (url, token) => {
  const newLikedTracks = axios
    .post(`${url}/likedtracks`, {
      token,
    })
    .then((res) => {
      return res.data;
    });
  return newLikedTracks
}

export const addToCount = async () => {
  axios.get(`${BASE_URL}/count-add`).then((res) => {
    return;
  });
}