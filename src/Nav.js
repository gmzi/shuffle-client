import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Login from './Login';
import Dashboard from './Dashboard';

const Nav = ({ logout }) => {
  return (
    <div>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '1vh' }}
      >
        <h2>Holu</h2>
      </Container>
    </div>
  );
};

export default Nav;

// DO A NICE CLEAN WELCOME TEMPLATE THAT WRAPS LOGIN AND DASHBOARD.
