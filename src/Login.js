import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ReactPlayer from 'react-player/vimeo';
import useAuth from './useAuth';
import axios from 'axios';
import Nav from './Nav';

const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=b4217743307a432d807c1e5840dde3a2&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-read-collaborative';

export default function Login({ code }) {
  const [userCount, setUserCount] = useState();

  useEffect(() => {
    axios.get('http://localhost:3001/count').then((res) => {
      setUserCount(res.data.user_count);
    });
  }, [code]);

  return (
    <div>
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <div className="Login-title">
          <h1>Shuffler</h1>
          <h4>All your Spotify songs in one place</h4>
        </div>
        <div className="Login-userCount">
          <h5>users so far: {userCount}</h5>
          <h5>last listened artist: xxxxxxx</h5>
          <h5>last listened tracks: yyyyyyy</h5>
        </div>
        <div className="Login-video-container">
          <h3>Video demo:</h3>
          <ReactPlayer url="https://vimeo.com/566622065" />
        </div>
        <div className="Login-btn-container">
          <h3>Get Started</h3>
          <p>Login with Spotify to retrieve all your tracks</p>
          <a className="btn btn-success btn-md" href={AUTH_URL}>
            Login
          </a>
        </div>
      </Container>
    </div>
  );
}
