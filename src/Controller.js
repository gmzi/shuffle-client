import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Player from './Player';
import QueueContext from './QueueContext';
import './Controller.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Controller = ({ accessToken, playlistsTracks, likedTracks }) => {

  const [queue, setQueue] = useState([]);
  // const [mode, setMode] = useState();

  useEffect(() => { }, [queue]);

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
    axios.post(`${BASE_URL}/track-add`, { track: track }).then((res) => {
      return;
    });
  }

  function playAll(offset = 0, top = 10) {
    // setMode((mode) => 'playAll');
    const allQueue = Object.values(playlistsTracks).map((t) => t.uri);
    const batch = allQueue.slice(offset, top);
    setQueue((queue) => batch);
  }

  function shuffleAll(offset = 0, top = 10) {
    // setMode((mode) => 'shuffleAll');
    const allUris = Object.values(playlistsTracks).map((t) => t.uri);
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

  function smartShuffle() {
    // TBD
  }

  function exportPlaylist() {
    // TBD
  }


  return (
    <QueueContext.Provider value={{ queue }}>
      <div className="Controller-dashboard">
        <Dashboard
          accessToken={accessToken}
          playlistsTracks={playlistsTracks}
          likedTracks={likedTracks}
          chooseTrack={chooseTrack}
          playAll={playAll}
          shuffleAll={shuffleAll}
          smartShuffle={smartShuffle}
          exportPlaylist={exportPlaylist}
        />
      </div>
      <div className="Controller-player">
        <Player accessToken={accessToken} playAll={playAll} />
      </div>
    </QueueContext.Provider>
  );
};

export default Controller;
