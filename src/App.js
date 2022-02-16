import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './Landing';
import Controller from './Controller';
import Navigation from './Navigation';
import axios from 'axios';
import './App.css';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

const code = new URLSearchParams(window.location.search).get('code');

const localStoredAccessToken = JSON.parse(window.localStorage.getItem('accessToken'))
const localStoredRefreshToken = JSON.parse(window.localStorage.getItem('refreshToken'))
const localStoredExpiresIn = JSON.parse(window.localStorage.getItem('expiresIn'))
const localLoginTime = JSON.parse(window.localStorage.getItem('loginTime'))

let accessToken;
let refreshToken;
let expiresIn;
let loginTime;

if (localStoredAccessToken) {
  accessToken = localStoredAccessToken;
  refreshToken = localStoredRefreshToken;
  expiresIn = localStoredExpiresIn;
  loginTime = localLoginTime;
}

export default function App() {
  const [localAccessToken, setLocalAccessToken] = useState(accessToken);
  const [localLoginTime, setLocalLoginTime] = useState(loginTime)

  useEffect(() => {
    async function checkLocalStorage() {
      if (!localAccessToken) {
        if (code) {
          try {
            const newTokens = await axios.post(`${BASE_URL}/login`, {
              code,
            });
            window.localStorage.setItem('accessToken', JSON.stringify(newTokens.data.accessToken))
            window.localStorage.setItem('refreshToken', JSON.stringify(newTokens.data.refreshToken))
            window.localStorage.setItem('expiresIn', JSON.stringify(newTokens.data.expiresIn))

            // store login time:
            const loginDate = new Date();
            const loginTime = loginDate.getTime();
            window.localStorage.setItem('loginTime', JSON.stringify(loginTime))

            // AVOID USING DATABASE
            // count new login in db:
            // await axios.get(`${BASE_URL}/count-add`)

            window.location = '/';
          } catch (e) {
            console.log('failed retrieving user libraries', e);
          }
        }
      } else {
        // CHECK IF TOKEN EXPIRED:
        const now = new Date();
        const newLoginTime = now.getTime();
        const validTime = localLoginTime + ((expiresIn / 60) * 60 * 1000)

        // DEV NOTE: set shorter token expiration time in order to test logic:
        // const validTime = localLoginTime + ((30 / 60) * 60 * 1000)

        // REFRESH TOKEN:
        if (now.getTime() > validTime) {
          const newTokens = await axios.post(`${BASE_URL}/refresh`, { refreshToken })
          // update local storage:
          window.localStorage.setItem('accessToken', JSON.stringify(newTokens.data.accessToken))
          window.localStorage.setItem('expiresIn', JSON.stringify(newTokens.data.expiresIn))
          window.localStorage.setItem('loginTime', JSON.stringify(newLoginTime))
          // reload with updated tokens, triggering a reload in dashboard to refresh user tracks:
          window.location = '/';
          // stop Controller from rendering Player without token:
          return;
        }
      }
    }
    checkLocalStorage();
  }, []);

  async function logout() {
    setLocalAccessToken((localAccessToken) => null);
  }

  return (
    <div>
      <Navigation accessToken={localAccessToken} logout={logout} />
      {localAccessToken ? (
        <>
          <Controller accessToken={localAccessToken} />
        </>
      ) : (
        <>
          <Landing code={code} />
        </>
      )}
    </div>
  );
}
