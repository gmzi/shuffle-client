import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Routes from './Routes';
import Nav from './Nav';
import ManageAccess from './ManageAccess';
import Dashboard from './Dashboard';
import axios from 'axios';

const code = new URLSearchParams(window.location.search).get('code');
const BASE_URL = "http://localhost:3001"

export default function App() {
  const [local, setLocal] = useState(null);
  const [userTracks, setUserTracks] = useState({})

  useEffect(() => {
    async function checkLocal() {
      const local = window.localStorage.getItem('localTokens');
      const tracks = window.localStorage.getItem('localTracks')
      const localTokens = JSON.parse(local);
      const localTracks = JSON.parse(tracks)
      if (localTokens && localTracks) {
        try {
          setLocal(localTokens.accessToken)
          setUserTracks(localTracks)
        } catch (e) {
          console.log('failed loading tracks', e);
        }
      } else {
        if (code){
          const newTokens = await axios.post(`${BASE_URL}/login`, {
            code,
          })
          window.localStorage.setItem('localTokens', JSON.stringify(newTokens.data))
          const newTracks = await axios.get('http://localhost:3001/tracks');
          window.localStorage.setItem('localTracks', JSON.stringify(newTracks.data))
          window.location = '/';
        }
      }
    }
    checkLocal();
  }, [local]);

  async function logout(){
    try {
    const cleanServerToken = await axios.get(`${BASE_URL}/logout`)
    window.localStorage.removeItem('localTokens');
    window.localStorage.removeItem('localTracks')
    setLocal((local) => null)
    setUserTracks((userTracks) => {})
    } catch(e){
      console.log('error when loging out', e)
    }
  }

  return <div>{local ? <> <Nav accessToken={local} logout={logout}/> <Routes accessToken={local} userTracks={userTracks} /> </> : <Login />}</div>;
}
