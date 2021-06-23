import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import useAuth from './useAuth';

const Routes = ({ code }) => {
  console.log('HERES CODE', code);

  return (
    <Switch>
      {code ? (
        <Route exact path="/">
          <Dashboard code={code} />
        </Route>
      ) : (
        <Route exact path="/">
          <Login />
        </Route>
      )}

      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
