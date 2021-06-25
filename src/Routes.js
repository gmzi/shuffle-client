import React, { useState, useEffect, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Dashboard';
import useAuth from './useAuth';
import Player from './Player';
import { QueueContext } from './QueueContext';
import Tryme from './Tryme';

const Routes = ({ code }) => {
  const accessToken = useAuth(code);
  const [userTracks, setUserTracks] = useState({});
  const [queue, setQueue] = useState([]);
  const [mode, setMode] = useState();

  useEffect(() => {
    if (!accessToken) return;
    axios.get('http://localhost:3001/tracks').then((res) => {
      setUserTracks(res.data);
    });
  }, [accessToken]);

  function chooseTrack(track) {
    const newQueue = [...queue];
    newQueue.unshift(track.uri);
    if (newQueue.length > 1) {
      newQueue.pop();
    }
    setQueue((queue) => newQueue);
    // setSearch('');
  }

  function playAll(offset = 0, top = 200) {
    setMode('playAll');
    const allQueue = Object.values(userTracks).map((t) => t.uri);
    const firstBatch = allQueue.slice(offset, top);
    setQueue((queue) => firstBatch);
    // TODO: set player callback to generate new batches after
    // playing the first 200 tracks.
  }

  function shuffleAll() {
    const idx = Math.floor(Math.random() * Object.keys(userTracks).length);
    // chooseTrack(userTracks[idx]);
    return userTracks[idx];
  }

  return (
    <div>
      {/* <Route exact path="/"> */}
      {/* <QueueContext.Provider value={{ phrase: 'hey' }} /> */}
      {/* <Tryme /> */}
      <Dashboard
        accessToken={accessToken}
        userTracks={userTracks}
        chooseTrack={chooseTrack}
        playAll={playAll}
      />
      {queue.length ? (
        <div>
          <Player
            accessToken={accessToken}
            queue={queue}
            mode={mode}
            playAll={playAll}
          />
        </div>
      ) : (
        <div>
          <p>click any song to play it</p>
        </div>
      )}
    </div>
  );
};

export default Routes;
