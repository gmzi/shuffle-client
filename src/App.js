import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Controller from './Controller';
import Navigation from './Navigation';
import axios from 'axios';
import './App.css';
import LoadingProgressContext from './LoadingProgressContext';
import { retrieveTracks, addToCount } from './helpers'

const code = new URLSearchParams(window.location.search).get('code');
const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
const TRACKS_URL = `${process.env.REACT_APP_TRACKS_URL}`;

const local = window.localStorage.getItem('localTokens');
const localTokens = JSON.parse(local);
let access;
if (localTokens) {
  access = localTokens.accessToken;
}

const tracks = window.localStorage.getItem('userPlaylistsTracks');
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

            // return;

            const userPlaylistsTracks = await retrieveTracks(
              `${TRACKS_URL}/playlists`,
              tokenToPost,
              setPlaylists
            )

            const userLikedTracks = await retrieveTracks(
              `${TRACKS_URL}/likedtracks`,
              tokenToPost,
              setLikedTracks
            )

            // MOVE ON FROM HERE, MAKE IT MODULAR
            window.localStorage.setItem(
              'userPlaylistsTracks',
              JSON.stringify(userPlaylistsTracks)
            );

            window.localStorage.setItem(
              'userLikedTracks',
              JSON.stringify(userLikedTracks)
            );

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
