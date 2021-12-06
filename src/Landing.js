import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import ReactPlayer from 'react-player/wistia';
// import { useHistory } from 'react-router-dom';
import './Landing.css';
import axios from 'axios';
import logo from './icons/logo_white.png';
// import LoadingProgressContext from './LoadingProgressContext';

const URI = process.env.REACT_APP_REDIRECT_URI;
const ID = `${process.env.REACT_APP_CLIENT_ID}`
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${ID}&response_type=code&redirect_uri=${URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-read-collaborative`;

export default function Landing({ code }) {
  const [recommended, setRecommended] = useState([]);
  // const history = useHistory();
  // const { playlists, likedTracks } = useContext(LoadingProgressContext);

  useEffect(() => {
    async function fetchRecommendedTracks() {
      axios
        .get('https://shuffle-server.vercel.app/api/recommendations')
        .then((res) => {
          const tracks = [];
          for (let key in res.data) {
            tracks.push(res.data[key]);
          }
          setRecommended(tracks)
        })
    }
    fetchRecommendedTracks();
  }, [])


  return (
    <div>
      <>
        {!code ? (
          <Container fluid>
            <section className="Video">
              <Row className="Cols-container">
                <Col className="Col-title" md={3}>
                  <p>All your library songs in one place to shuffle them</p>
                </Col>
                <Col className="Col-video" md={6}>
                  <div className="player-wrapper">
                    <ReactPlayer
                      url="https://gmzieres.wistia.com/medias/bvp1geks05"
                      className="player"
                      width="100%"
                      height="100%"
                    />
                  </div>
                </Col>
              </Row>
            </section>
            <section className="Start">
              <img src={logo} alt="spotify-logo" className="Logo d-inline" />
              {/* <p>Login with Spotify to retrieve all your tracks</p> */}
              <div className="btn-container">
                <Button className="btn-lg" href={AUTH_URL}>
                  Login
                </Button>
              </div>
              <p className="Login-signup">
                Don't have an account?
                <a href="https://www.spotify.com">
                  <span> Sign up </span>
                </a>
              </p>
            </section>
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
                                alt="album-cover"
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
                                alt="album-cover"
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
                                alt="album-cover"
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
                                alt="album-cover"
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
          </Container>
        ) : (
          <Container fluid className="loading">
            <p>Loging in...</p>
          </Container>
        )}
      </>
    </div>
  );
}
