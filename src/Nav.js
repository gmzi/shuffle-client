import React  from 'react';
import './Nav.css'
import icon from "./icons/black.png"

const Nav = ({accessToken, logout}) => {

  const handleLogout = () => {
    logout()
  };

  return (
    <nav className="Nav navbar navbar-expand-md">
      <a className="navbar-brand" href="/">
      <span className="Nav-brand"><img src={icon} alt="icon" className="Nav-icon"/> shuffle all songs
      </span></a>
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
