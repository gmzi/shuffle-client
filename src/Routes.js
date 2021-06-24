import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import useAuth from './useAuth';
import Player from './Player';
import Tryme from './Tryme';

const Routes = ({ code }) => {
  const accessToken = useAuth(code);

  return (
    <div>
      <Route exact path="/">
        <Dashboard accessToken={accessToken} />
        <Player accessToken={accessToken} />
      </Route>
    </div>
  );
};

export default Routes;
