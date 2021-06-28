import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Routes from './Routes';
import Nav from './Nav';
import axios from 'axios';

const code = new URLSearchParams(window.location.search).get('code');
const BASE_URL = 'http://localhost:3001';

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
        // if no logged in user go to spotify login page, then set data in localStorage:
        if (code) {
          try {
            const newTokens = await axios.post(`${BASE_URL}/login`, {
              code,
            });
            window.localStorage.setItem(
              'localTokens',
              JSON.stringify(newTokens.data)
            );
            const newTracks = await axios.get('http://localhost:3001/tracks');
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
      }
    }
    checkLocalStorage();
  }, [localTokens, localTracks]);

  async function addToCount() {
    axios.get('http://localhost:3001/count-add').then((res) => {
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
          {' '}
          <Nav accessToken={local} logout={logout} />{' '}
          <Routes accessToken={local} userTracks={userTracks} />{' '}
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}
