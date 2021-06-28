import React, { useState, useEffect, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Dashboard';
import useAuth from './useAuth';
import Player from './Player';
import QueueContext from './QueueContext';
import Counter from './Counter';

const Routes = ({ accessToken, userTracks }) => {
  const [queue, setQueue] = useState([]);
  const [mode, setMode] = useState();

  const [count, setCount] = useState(100);

  const increment = () => {
    setCount((count) => count + 1);
  };

  function chooseTrack(track) {
    const newQueue = [...queue];
    if (newQueue.length === 0) {
      newQueue.unshift(track.uri);
    } else if (newQueue.length === 1) {
      newQueue.unshift(track.uri);
      newQueue.pop();
    } else {
      if (mode === 'playAll') {
        // newQueue.shift();
        // newQueue.unshift(track.uri);
        // algo
      }
      if (mode === 'shuffleAll') {
        console.log('corre aca');
        const newQueue = [];
        while (newQueue.length < 10) {
          const idx = Math.floor(
            // Math.random() * Object.keys(userTracks).length
            Math.random() * 10
          );
          newQueue.push(userTracks[idx].uri);
        }
        console.log(newQueue);
        newQueue.unshift(track.uri);
      }
    }
    setQueue((queue) => newQueue);
    // setSearch('');
  }

  function playAll(offset = 0, top = 10) {
    setMode((mode) => 'playAll');
    const allQueue = Object.values(userTracks).map((t) => t.uri);
    const batch = allQueue.slice(offset, top);
    setQueue((queue) => batch);
  }

  function shuffleAll() {
    setMode((mode) => 'shuffleAll');
    const batch = [];
    while (batch.length < 10) {
      const idx = Math.floor(Math.random() * 10);
      batch.push(userTracks[idx].uri);
    }
    setQueue((queue) => batch);
  }

  return (
    <div>
      <QueueContext.Provider value={{ queue, mode }}>
        <Dashboard
          accessToken={accessToken}
          userTracks={userTracks}
          chooseTrack={chooseTrack}
          playAll={playAll}
          shuffleAll={shuffleAll}
        />
        {queue.length ? (
          <div>
            <Player accessToken={accessToken} playAll={playAll} />
          </div>
        ) : (
          <div>
            <p>click any song to play it</p>
          </div>
        )}
      </QueueContext.Provider>
    </div>
  );
};

export default Routes;
