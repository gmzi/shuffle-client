import React, { useContext, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useAuth from './useAuth';
import useToken from './useToken';
import Counter from './Counter';

const Nav = ({accessToken, logout}) => {

  // useEffect(() => {
  //   function checkUser() {
  //     const existingToken = JSON.parse(localStorage.getItem('localToken'));
  //     if (existingToken) {
  //       setCheckedToken((checkedToken) => existingToken);
  //     }
  //   }
  //   checkUser();
  // }, [localStorage]);

  const handleLogout = () => {
    logout()
  };

  return (
    <nav className="Nav navbar navbar-expand-md">
      <a className="navbar-brand" href="/">
        Shuffler <span>(all your songs in one place)</span>
      </a>
      <ul className="navbar-nav ml-auto">
        <>
          {accessToken ? (
            <li className="nav-item mr-4">
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <li>no</li>
          )}
        </>
      </ul>
    </nav>
  );
};

export default Nav;
