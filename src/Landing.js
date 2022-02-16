import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ReactPlayer from 'react-player/wistia';
// import { useHistory } from 'react-router-dom';
import './Landing.css';
import axios from 'axios';
import logo from './icons/logo_white.png';
import RecommendedTracks from './RecommendedTracks';
// import LoadingProgressContext from './LoadingProgressContext';

const URI = process.env.REACT_APP_REDIRECT_URI;
const ID = `${process.env.REACT_APP_CLIENT_ID}`
// const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${ID}&response_type=code&redirect_uri=${URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-read-collaborative`;
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${ID}&response_type=code&redirect_uri=${URI}&
scope=
streaming%20
user-read-email%20
user-read-private%20
user-library-read%20
user-library-modify%20
user-read-playback-state%20
user-modify-playback-state%20
playlist-read-private%20
playlist-read-collaborative%20
playlist-modify-private%20
playlist-modify-public
`

const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

export default function Landing({ code }) {

  // AVOID USING DATABASE
  // const [recommended, setRecommended] = useState([]);

  // useEffect(() => {
  //   async function fetchRecommendedTracks() {
  //     axios
  //       .get(`${BASE_URL}/recommendations`)
  //       .then((res) => {
  //         const tracks = [];
  //         for (let key in res.data) {
  //           tracks.push(res.data[key]);
  //         }
  //         setRecommended(tracks)
  //       })
  //   }
  //   fetchRecommendedTracks();
  // }, [])


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
            {/* <RecommendedTracks recommended={recommended} /> */}
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
