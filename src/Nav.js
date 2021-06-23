import React, { useContext, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useAuth from './useAuth';

const Nav = ({ code }) => {
  function logout() {
    console.log('logout function ');
  }

  return (
    <nav className="Nav navbar navbar-expand-md">
      <a className="navbar-brand" href="/">
        Shuffler <span>(all your songs in one place)</span>
      </a>
      <ul className="navbar-nav ml-auto">
        {code ? (
          <>
            <li className="nav-item mr-4">
              <NavLink className="nav-link" exact to="/" onClick={logout}>
                logout from Spotify
              </NavLink>
            </li>
          </>
        ) : (
          <li></li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
