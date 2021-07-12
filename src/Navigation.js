import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Navigation.css';
import icon from './icons/arrows.png';

const Navigation = ({ accessToken, logout }) => {
  const handleLogout = () => {
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
