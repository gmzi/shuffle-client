import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Media, Button, Spinner } from 'react-bootstrap';
import ReactPlayer from 'react-player/vimeo';
import { useHistory } from 'react-router-dom';
import './Login.css';
import useAuth from './useAuth';
import axios from 'axios';
import logo from './icons/black.png';

const URI = process.env.REACT_APP_REDIRECT_URI;

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=b4217743307a432d807c1e5840dde3a2&response_type=code&redirect_uri=${URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-read-collaborative`;

export default function Login({ code }) {
  const [recommended, setRecommended] = useState([]);
  const history = useHistory();

  useEffect(async () => {
    // axios.get('/recommendations').then((res) => {
    axios.get('https://shuffle-server.vercel.app/api/hola').then((res) => {
      const tracks = [];
      console.log(res.data);
      // for (let key in res.data) {
      //   tracks.push(res.data[key]);
      // }
      setRecommended(tracks);
    });
  }, []);

  return (
    <div>
      <>
        {!code ? (
          <Container fluid>
            <section className="Stats">
              <Row className="">
                <>
                  {recommended.length ? (
                    <Col>
                      <Row>
                        <h6>Recommended songs for this time and day</h6>
                      </Row>
                      <Row>
                        <Col>
                          <div
                            className="Track d-flex m-2 align-items-center"
                            style={{ cursor: 'pointer' }}
                          >
                            <a href={recommended[0].uri}>
                              <img
                                src={recommended[0].albumUrl}
                                style={{ height: '64px', width: '64px' }}
                              />
                            </a>
                            <a href={recommended[0].uri}>
                              <div className="details ml-3">
                                <div>{recommended[0].title}</div>
                                <div className="details text-muted">
                                  {recommended[0].artists.map((a) => a)}
                                </div>
                              </div>
                            </a>
                          </div>
                        </Col>
                        <Col>
                          <div
                            className="Track d-flex m-2 align-items-center"
                            style={{ cursor: 'pointer' }}
                          >
                            <a href={recommended[1].uri}>
                              <img
                                src={recommended[1].albumUrl}
                                style={{ height: '64px', width: '64px' }}
                              />
                            </a>
                            <a href={recommended[1].uri}>
                              <div className="details ml-3">
                                <div>{recommended[1].title}</div>
                                <div className="details text-muted">
                                  {recommended[1].artists.map((a) => a)}
                                </div>
                              </div>
                            </a>
                          </div>
                        </Col>
                        <Col>
                          <div
                            className="Track d-flex m-2 align-items-center"
                            style={{ cursor: 'pointer' }}
                          >
                            <a href={recommended[2].uri}>
                              <img
                                src={recommended[2].albumUrl}
                                style={{ height: '64px', width: '64px' }}
                              />
                            </a>
                            <a href={recommended[2].uri}>
                              <div className="details ml-3">
                                <div>{recommended[2].title}</div>
                                <div className="details text-muted">
                                  {recommended[2].artists.map((a) => a)}
                                </div>
                              </div>
                            </a>
                          </div>
                        </Col>
                        <Col>
                          <div
                            className="Track d-flex m-2 align-items-center"
                            style={{ cursor: 'pointer' }}
                          >
                            <a href={recommended[3].uri}>
                              <img
                                src={recommended[3].albumUrl}
                                style={{ height: '64px', width: '64px' }}
                              />
                            </a>
                            <a href={recommended[3].uri}>
                              <div className="details ml-3">
                                <div>{recommended[3].title}</div>
                                <div className="details text-muted">
                                  {recommended[3].artists.map((a) => a)}
                                </div>
                              </div>
                            </a>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  ) : (
                    <div></div>
                  )}
                </>
              </Row>
            </section>
            <section className="Video">
              <h6>App demo</h6>
              <div className="player-wrapper">
                <ReactPlayer
                  url="https://vimeo.com/571336023"
                  className="player"
                  width="100%"
                  height="100%"
                />
              </div>
            </section>
            <section className="Start">
              <h6>Get Started</h6>
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
            </section>
          </Container>
        ) : (
          <Container fluid className="loading">
            <p>Loading tracks, this could take a while</p>
            <Spinner animation="border" variant="success" />
          </Container>
        )}
      </>
    </div>
  );
}
