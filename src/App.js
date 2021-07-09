import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Routes from './Routes';
import Navigation from './Navigation';
import axios from 'axios';
import './App.css';

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

            // const newTracks = await axios.get(`${BASE_URL}/tracks`);

            const newTracks = await axios.post(`${TRACKS_URL}`, {
              tokenToPost,
            });

            window.localStorage.setItem(
              'localTracks',
              JSON.stringify(newTracks.data)
            );
            addToCount();
            window.location = '/';
          } catch (e) {
            console.log('failed retrieving tracks', e);
          }
        }
      } else {
        // TODO: check if existing token is valid, proceed with render if it is, else refresh accessToken.
        // TODO: render loading icon while retrieving tracks, instead of loading the login compnent twice.
      }
    }
    checkLocalStorage();
  }, [localTokens, localTracks]);

  async function addToCount() {
    axios.get(`${BASE_URL}/count-add`).then((res) => {
      return;
    });
  }

  async function logout() {
    try {
      const cleanServerToken = await axios.get(`${BASE_URL}/logout`);
      window.localStorage.removeItem('localTokens');
      window.localStorage.removeItem('localTracks');
      setLocal((local) => null);
      setUserTracks((userTracks) => {});
    } catch (e) {
      console.log('error when loging out', e);
    }
  }

  return (
    <div>
      {local ? (
        <>
          <Navigation accessToken={local} logout={logout} />
          <Routes accessToken={local} userTracks={userTracks} />
        </>
      ) : (
        <>
          <Navigation accessToken={local} logout={logout} />
          <Login code={code} />
        </>
      )}
    </div>
  );
}
