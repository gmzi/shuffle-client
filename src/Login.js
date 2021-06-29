import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Media } from 'react-bootstrap';
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
      <Container fluid>
        <section className="Stats">
          <Row className="">
            <>
              <Col md="auto">
                <h5>Song lists made: {userCount}</h5>
              </Col>
              {lastTrack ? (
                <>
                  <Col md="auto">
                    <h5>Last selected song</h5>
                    <Col md="auto">
                      <a href={lastTrack[0]}>
                        <Media>
                          <img
                            src={lastTrack[2]}
                            width={64}
                            height={64}
                            alt="allbum-thumbnail"
                          />
                          <Media.Body className="ml-3">
                            <p>{lastTrack[1]}</p>
                            <p className="text-muted">{lastTrack[3]}</p>
                          </Media.Body>
                        </Media>
                      </a>
                    </Col>
                  </Col>
                </>
              ) : (
                <div></div>
              )}
            </>
          </Row>
        </section>
        <section className="Video">
          <Row>
            <h5>Video demo:</h5>
            <div className="player-wrapper">
              <ReactPlayer
                url="https://vimeo.com/566622065"
                className="player"
                width="100%"
                height="100%"
              />
            </div>
          </Row>
        </section>
        <section className="Start">
          <Row>
            <h5>Get Started:</h5>
            <p>Login with Spotify to retrieve all your tracks</p>
            <a className="btn btn-success btn-md" href={AUTH_URL}>
              Login
            </a>
            <p className="Login-signup">
              Don't have a Spotify account?
              <a href="https://www.spotify.com">
                <span> Sign up </span>
              </a>
            </p>
          </Row>
        </section>
      </Container>
    </div>
  );
}
