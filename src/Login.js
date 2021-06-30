import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Media, Button } from 'react-bootstrap';
import ReactPlayer from 'react-player/vimeo';
import './Login.css';
import useAuth from './useAuth';
import axios from 'axios';
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
      setLastTrack(track);
    });
  }, []);

  return (
    <div>
      <Container fluid style={{ height: '100vh' }}>
        <section className="Stats">
          <Row className="">
            <>
              <Col sm={4}>
                <Row>
                  <h6>Song lists made</h6>
                </Row>
                <Row>
                  <span>{userCount}</span>
                </Row>
              </Col>
              {lastTrack ? (
                <>
                  <Col large={true}>
                    <Row>
                      <h6>Last selected song</h6>
                    </Row>
                    <Row>
                      <a href={lastTrack[0]}>
                        <Media className="">
                          <img
                            src={lastTrack[2]}
                            width={164}
                            height={164}
                            className="align-self-start mr-3"
                            alt="allbum-thumbnail"
                          />
                          <Media.Body className="ml-3">
                            <p className="track-name text-muted">
                              <strong>{lastTrack[1]}</strong>
                            </p>
                            <p className="artist-name ">{lastTrack[3]}</p>
                          </Media.Body>
                        </Media>
                      </a>
                    </Row>
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
            <h6>Video demo:</h6>
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
          <Row className="d-flex flex-d column">
            <h6>Get Started:</h6>
            <p>Login with Spotify to retrieve all your tracks</p>
            <div className="btn-container">
              <Button className="btn-lg" href={AUTH_URL}>
                Login
              </Button>
            </div>
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
