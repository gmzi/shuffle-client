import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Controller from './Controller';
import Navigation from './Navigation';
import axios from 'axios';
import './App.css';
import LoadingProgressContext from './LoadingProgressContext';
import { retrieveTracks, likedOnly, addToCount } from './helpers'

const code = new URLSearchParams(window.location.search).get('code');
const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
const TRACKS_URL = `${process.env.REACT_APP_TRACKS_URL}`;

const local = window.localStorage.getItem('localTokens');
const localTokens = JSON.parse(local);
let access;
if (localTokens) {
  access = localTokens.accessToken;
}

const tracks = window.localStorage.getItem('localTracks');
const localTracks = JSON.parse(tracks);

export default function App() {
  const [local, setLocal] = useState(access);
  const [userTracks, setUserTracks] = useState(localTracks);
  const [playlists, setPlaylists] = useState();
  const [likedTracks, setLikedTracks] = useState();

  useEffect(() => {
    async function checkLocalStorage() {
      if (!localTokens) {
        if (code) {
          try {
            const newTokens = await axios.post(`${BASE_URL}/login`, {
              code,
            });
            window.localStorage.setItem(
              'localTokens',
              JSON.stringify(newTokens.data)
            );

            const tokenToPost = newTokens.data.accessToken;

            // const allTracks = await retrieveTracks(
            //   TRACKS_URL,
            //   tokenToPost,
            //   setPlaylists,
            //   setLikedTracks
            // );

            // console.log(allTracks)

            const userPlaylistsTracks = await retrieveTracks(
              `${TRACKS_URL}/playlists`,
              tokenToPost,
              setPlaylists
            )

            console.log('playlists', userPlaylistsTracks)
            console.log('playlists', Object.keys(userPlaylistsTracks).length)

            const userLikedTracks = await retrieveTracks(
              `${TRACKS_URL}/likedtracks`,
              tokenToPost,
              setLikedTracks
            )

            console.log('liked', userLikedTracks)
            console.log('liked', Object.keys(userLikedTracks).length)
            // TRYYYYYY OBJECT.ASSIGN METHOD OR GET A FUCKING HAMMER AND MAKE IT WORK
            const allUserTracks = { ...userPlaylistsTracks, ...userLikedTracks }

            console.log('alltracks', allUserTracks)
            console.log('alltracks', Object.keys(allUserTracks).length)

            // const all = async (oneObject, otherObject) => {
            //   const one = await oneObject;
            //   const two = await otherObject;
            //   const ready = { ...one, ...two }
            // }

            // const dale = all(userPlaylistsTracks, userLikedTracks)
            // console.log(dale)

            return;

            // const likeIt = await likedOnly(TRACKS_URL, tokenToPost)
            // console.log(typeof (likeIt))
            // return;

            // window.localStorage.setItem(
            //   'localTracks',
            //   JSON.stringify(allTracks)
            // );

            // const TRYtracks = window.localStorage.getItem('localTracks');
            // const TRYlocalTracks = JSON.parse(TRYtracks);
            // console.log(TRYlocalTracks)

            addToCount();

            window.location = '/';

          } catch (e) {
            console.log('failed retrieving user libraries', e);
          }
        }
      } else {
        console.log('aca taaaaaaaaaaaaaaaa')
        // TODO: check if existing token is valid, proceed with render if it is, else refresh accessToken.
        // TODO: render loading icon while retrieving tracks, instead of loading the login compnent twice.
      }
    }
    checkLocalStorage();
  }, [localTokens, localTracks]);

  async function logout() {
    try {
      const cleanServerToken = await axios.get(`${BASE_URL}/logout`);
      window.localStorage.removeItem('localTokens');
      window.localStorage.removeItem('localTracks');
      setLocal((local) => null);
      setUserTracks((userTracks) => { });
    } catch (e) {
      console.log('error when logging out', e);
    }
  }

  return (
    <div>
      {local ? (
        <>
          <Navigation accessToken={local} logout={logout} />
          <Controller accessToken={local} userTracks={userTracks} />
        </>
      ) : (
        <>
          <LoadingProgressContext.Provider value={{ playlists, likedTracks }}>
            <Navigation accessToken={local} logout={logout} />
            <Login code={code} />
          </LoadingProgressContext.Provider>
        </>
      )}
    </div>
  );
}
