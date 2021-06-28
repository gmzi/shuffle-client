import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ReactPlayer from 'react-player/vimeo';
import './Login.css';
import useAuth from './useAuth';
import axios from 'axios';
import Nav from './Nav';
import logo from './icons/black.png';

const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=b4217743307a432d807c1e5840dde3a2&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-read-collaborative';

export default function Login({ code }) {
  const [userCount, setUserCount] = useState();
  const [lastTrack, setLastTrack] = useState();

  useEffect(async () => {
    axios.get('http://localhost:3001/count').then((res) => {
      setUserCount(res.data.user_count);
    });
    axios.get('http://localhost:3001/track').then((res) => {
      const track = [];
      for (let key in res.data) {
        track.push([res.data[key]]);
      }
      console.log(track);
      setLastTrack(track);
    });
  }, []);

  return (
    <div>
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <div className="Login-title">
          <h1>
            <img src={logo} alt="logo" className="Login-logo"></img> all my
            songs
          </h1>
        </div>
        <div className="Login-userCount">
          <h5>Song lists made: {userCount}</h5>

          {lastTrack ? (
            <div>
              <h5>Last clicked song: </h5>
              <div>
                <img
                  src={lastTrack[2]}
                  style={{ height: '64px', width: '64px' }}
                />
                <div className="ml-3">
                  <div>{lastTrack[1]}</div>
                  <div className="text-muted">{lastTrack[3]}</div>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="Login-video-container">
          <h3>Video demo:</h3>
          <ReactPlayer url="" />
        </div>
        <div className="Login-btn-container">
          <h3>Get Started</h3>
          <p>Login with Spotify to retrieve all your tracks</p>
          <a className="btn btn-success btn-md" href={AUTH_URL}>
            Login
          </a>
          <p>
            Don't have a Spotify account?{' '}
            <a href="https://www.spotify.com">Sign up</a>
          </p>
        </div>
      </Container>
    </div>
  );
}
