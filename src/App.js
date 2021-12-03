import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Controller from './Controller';
import Navigation from './Navigation';
import axios from 'axios';
import './App.css';
import LoadingProgressContext from './LoadingProgressContext';
import { retrieveTracks, addToCount } from './helpers'
import { mockTracks } from './mockTracks';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
// const TRACKS_URL = `${process.env.REACT_APP_TRACKS_URL}`;

const code = new URLSearchParams(window.location.search).get('code');
const localStoredTokens = JSON.parse(window.localStorage.getItem('localTokens'))

let access;
if (localStoredTokens) {
  access = localStoredTokens.accessToken;
}

// const localPlaylistsTracks = JSON.parse(window.localStorage.getItem('userPlaylistsTracks'))
// const localLikedTracks = JSON.parse(window.localStorage.getItem('userLikedTracks'))

export default function App() {
  const [localToken, setLocalToken] = useState(access);
  // const [playlistsTracks, setPlaylistsTracks] = useState(mockTracks);
  // const [likedTracks, setLikedTracks] = useState(mockTracks)
  // loading wheels:
  const [loadingPlaylistsTracks, setLoadingPlaylistsTracks] = useState();
  const [loadingLikedTracks, setLoadingLikedTracks] = useState();

  useEffect(() => {
    async function checkLocalStorage() {
      if (!localToken) {
        // if (!localStoredTokens) {
        if (code) {
          try {
            const newTokens = await axios.post(`${BASE_URL}/login`, {
              code,
            });
            window.localStorage.setItem(
              'localTokens',
              JSON.stringify(newTokens.data)
            );
            // const tokenToPost = newTokens.data.accessToken;

            window.location = '/';

          } catch (e) {
            console.log('failed retrieving user libraries', e);
          }
        }
      } else {
        console.log('aca taaaaaaaaaaaaaaaa')
        // TODO: check if existing token is valid, proceed with render if it is, else refresh accessToken.
        // TODO: render loading icon while retrieving tracks, instead of loading the login compnent twice.
        // TODO: offer the option to refresh user tracks library, in case user updates its spotify library, to have
        // the option to bring that update inmediately. 
      }
    }
    checkLocalStorage();
  }, [localToken]);

  async function logout() {
    try {
      const cleanServerToken = await axios.get(`${BASE_URL}/logout`);
      window.localStorage.removeItem('localTokens');
      window.localStorage.removeItem('userPlaylistsTracks');
      window.localStorage.removeItem('userLikedTracks');
      setLocalToken((localToken) => null);
      // setPlaylistsTracks((playlistsTracks) => { });
      // setLikedTracks((likedTracks) => { });
    } catch (e) {
      console.log('error when logging out', e);
    }
  }

  return (
    <div>
      {localToken ? (
        <>
          <Navigation accessToken={localToken} logout={logout} />
          <Controller accessToken={localToken} />
          {/* <Controller accessToken={localToken} playlistsTracks={playlistsTracks} likedTracks={likedTracks} /> */}
        </>
      ) : (
        <>
          <LoadingProgressContext.Provider value={{ loadingPlaylistsTracks, loadingLikedTracks }}>
            <Navigation accessToken={localToken} logout={logout} />
            <Login code={code} />
          </LoadingProgressContext.Provider>
        </>
      )}
    </div>
  );
}
