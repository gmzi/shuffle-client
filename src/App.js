import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './Landing';
import Controller from './Controller';
import Navigation from './Navigation';
import axios from 'axios';
import './App.css';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

const code = new URLSearchParams(window.location.search).get('code');
const localStoredTokens = JSON.parse(window.localStorage.getItem('localTokens'))

let access;
if (localStoredTokens) {
  access = localStoredTokens.accessToken;
}

export default function App() {
  const [localToken, setLocalToken] = useState(access);

  useEffect(() => {
    async function checkLocalStorage() {
      if (!localToken) {
        if (code) {
          try {
            const newTokens = await axios.post(`${BASE_URL}/login`, {
              code,
            });
            window.localStorage.setItem(
              'localTokens',
              JSON.stringify(newTokens.data)
            );
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
      // const cleanServerToken = await axios.get(`${BASE_URL}/logout`);
      // window.localStorage.removeItem('localTokens');
      // window.localStorage.removeItem('userPlaylistsTracks');
      // window.localStorage.removeItem('userLikedTracks');
      setLocalToken((localToken) => null);
    } catch (e) {
      console.log('error when logging out', e);
    }
  }

  return (
    <div>
      <Navigation accessToken={localToken} logout={logout} />
      {localToken ? (
        <>
          <Controller accessToken={localToken} />
        </>
      ) : (
        <>
          <Landing code={code} />
        </>
      )}
    </div>
  );
}
