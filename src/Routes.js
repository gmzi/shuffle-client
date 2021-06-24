import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './Login';
import Dashboard from './Dashboard';
import useAuth from './useAuth';
import Player from './Player';
import Tryme from './Tryme';
import useQueue from './useQueue';

const Routes = ({ code }) => {
  const accessToken = useAuth(code);

  const [userTracks, queue, chooseTrack] = useQueue(accessToken);

  // function shuffleAll() {
  //   const idx = Math.floor(Math.random() * Object.keys(userTracks).length);
  //   // chooseTrack(userTracks[idx]);
  //   return userTracks[idx];
  // }

  return (
    <div>
      <Route exact path="/">
        <Dashboard
          accessToken={accessToken}
          userTracks={userTracks}
          chooseTrack={chooseTrack}
        />
        <Player accessToken={accessToken} />
      </Route>
    </div>
  );
};

export default Routes;
