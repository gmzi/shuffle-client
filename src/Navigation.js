import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import axios from 'axios';
import './Navigation.css';
import icon from './icons/arrows.png';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

const Navigation = ({ accessToken, logout }) => {

  const handleLogout = async () => {
    const cleanServerToken = await axios.get(`${BASE_URL}/logout`);
    window.localStorage.removeItem('localTokens');
    window.localStorage.removeItem('userPlaylistsTracks');
    window.localStorage.removeItem('userLikedTracks');
    logout();
  };

  return (
    <Navbar variant="dark" expand="lg" className="Navbar">
      <Navbar.Brand href="/">
        <img
          src={icon}
          alt="icon"
          className="Navigation-logo d-inline-block align-top"
        />
        shuffle
      </Navbar.Brand>
      {accessToken ? (
        <Nav className="mr-auto">
          <Nav.Link className="" onClick={handleLogout}>
            Logout
          </Nav.Link>
        </Nav>
      ) : (
        <Nav></Nav>
      )}
    </Navbar>
  );
};

export default Navigation;
