import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Player from './Player';
import QueueContext from './QueueContext';
import './Routes.css';

const Routes = ({ accessToken, userTracks }) => {
  const [queue, setQueue] = useState([]);
  const [mode, setMode] = useState();

  useEffect(() => {}, [queue]);

  function chooseTrack(track) {
    countTrack(track);
    const newQueue = [...queue];
    if (newQueue.length === 0) {
      newQueue.unshift(track.uri);
    } else if (newQueue.length >= 1) {
      newQueue.pop();
      newQueue.unshift(track.uri);
    }
    setQueue((queue) => newQueue);
  }

  async function countTrack(track) {
    axios
      .post('http://localhost:3001/track-add', { track: track })
      .then((res) => {
        return;
      });
  }

  function playAll(offset = 0, top = 10) {
    setMode((mode) => 'playAll');
    const allQueue = Object.values(userTracks).map((t) => t.uri);
    const batch = allQueue.slice(offset, top);
    setQueue((queue) => batch);
  }

  function shuffleAll(offset = 0, top = 10) {
    setMode((mode) => 'shuffleAll');
    const allUris = Object.values(userTracks).map((t) => t.uri);
    const batch = [];
    let previousIdx = [];
    while (batch.length < top) {
      const idx = Math.floor(Math.random() * top);
      if (!previousIdx.includes(idx)) {
        batch.push(allUris[idx]);
        previousIdx.push(idx);
      }
    }
    setQueue((queue) => batch);
  }

  return (
    <QueueContext.Provider value={{ queue, mode }}>
      <div className="Routes-dashboard">
        <Dashboard
          accessToken={accessToken}
          userTracks={userTracks}
          chooseTrack={chooseTrack}
          playAll={playAll}
          shuffleAll={shuffleAll}
        />
      </div>
      <div className="Routes-player">
        <Player accessToken={accessToken} playAll={playAll} />
      </div>
    </QueueContext.Provider>
  );
};

export default Routes;

/**
 * if (mode === 'playAll') {
        // newQueue.shift();
        // newQueue.unshift(track.uri);
        // algo
      }
      if (mode === 'shuffleAll') {
        const newQueue = [];
        while (newQueue.length < 10) {
          const idx = Math.floor(
            // Math.random() * Object.keys(userTracks).length
            Math.random() * 10
          );
          newQueue.push(userTracks[idx].uri);
        }
        newQueue.unshift(track.uri);
      }
 */
