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

  useEffect(() => {
    async function checkLocal() {
      const local = window.localStorage.getItem('localTokens');
      const localTokens = JSON.parse(local);
      if (localTokens) {
        try {
          setLocal(localTokens.accessToken)
        } catch (e) {
          console.log('Loading problem', e);
        }
      } else {
        if (code){
          const newTokens = await axios.post(`${BASE_URL}/login`, {
            code,
          })
          window.localStorage.setItem('localTokens', JSON.stringify(newTokens.data))
          window.location = '/';
        }
      }
    }
    checkLocal();
  }, [local]);

  async function logout(){
    const cleanServer = await axios.get(`${BASE_URL}/logout`)
    window.localStorage.removeItem('localTokens');
    setLocal((local) => null)
  }

  return <div>{local ? <> <Nav accessToken={local} logout={logout}/> <Routes accessToken={local} /> </> : <Login />}</div>;
}

