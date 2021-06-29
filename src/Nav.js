import React from 'react';
import './Nav.css';
import icon from './icons/black.png';

const Nav = ({ accessToken, logout }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="Nav navbar">
      <a className="navbar-brand" href="/">
        <span className="Nav-brand">
          <img src={icon} alt="icon" className="Nav-icon" /> shuffle
        </span>
        {accessToken ? (
          <span className="Nav-btn">
            <a className="nav-btn" onClick={handleLogout}>
              Logout
            </a>
          </span>
        ) : (
          console.log('')
        )}
      </a>
    </nav>
  );
};

export default Nav;
