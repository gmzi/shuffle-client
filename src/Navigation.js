import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Navigation.css';
import icon from './icons/white.png';

const Navigation = ({ accessToken, logout }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="Navbar">
      <Navbar.Brand href="/">
        <img
          src={icon}
          alt="icon"
          width="30"
          height="30"
          className="d-inline-block align-top"
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
