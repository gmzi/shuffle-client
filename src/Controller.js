import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Player from './Player';
import QueueContext from './QueueContext';
import { fillPlaylist } from './helpers';
import './Controller.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const TRACKS_URL = process.env.REACT_APP_TRACKS_URL;

const Controller = ({ accessToken }) => {

  const [queue, setQueue] = useState([]);

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

  function playAll(playlistsTracks, likedTracks, offset = 0, top = 10) {
    let fullQueue;

    if (playlistsTracks && !likedTracks) {
      fullQueue = Object.values(playlistsTracks).map((t) => t.uri)
    } else if (playlistsTracks && likedTracks) {
      const playlists = Object.values(playlistsTracks).map((t) => t.uri)
      const liked = Object.values(likedTracks).map((t) => t.uri)
      fullQueue = [...playlists, ...liked]
    } else {
      alert('songs are on the way!')
      return;
    }
    const batch = fullQueue.slice(offset, top);
    setQueue((queue) => batch);
  }

  function shuffleAll(playlistsTracks, likedTracks, offset = 0, top = 10) {
    let fullList;
    if (playlistsTracks && !likedTracks) {
      fullList = Object.values(playlistsTracks).map((t) => t.uri)
    } else if (playlistsTracks && likedTracks) {
      const playlists = Object.values(playlistsTracks).map((t) => t.uri);
      const liked = Object.values(likedTracks).map((t) => t.uri);
      fullList = [...playlists, ...liked]
    } else {
      alert('songs are on the way!')
      return;
    }
    const batch = [];
    let previousIdx = [];
    while (batch.length < top) {
      const idx = Math.floor(Math.random() * top);
      if (!previousIdx.includes(idx)) {
        batch.push(fullList[idx]);
        previousIdx.push(idx);
      }
    }
    setQueue((queue) => batch);
  }

  function smartShuffle() {
    // TBD
  }

  async function exportPlaylist(playlistsTracks, likedTracks) {
    // CHECK IF ALL TRACKS ARE LOADED, IF NOT, MAKE USER WAIT
    let fullArray;
    if (playlistsTracks && likedTracks) {
      const playlists = Object.values(playlistsTracks).map((t) => t.uri)
      const liked = Object.values(likedTracks).map((t) => t.uri)
      fullArray = [...playlists, ...liked]
    } else {
      alert('songs are on the way, please retry after they completely load')
      return;
    }

    // GET USER ID:
    const user = await axios.get(
      'https://api.spotify.com/v1/me',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const userID = user.data.id;

    // CHECK IF USER ALREADY HAS A SHUFFLE PLAYLIST
    // IF THEY DO, UPDATE OR DELETE
    const existingPlaylist = await axios.post(
      `${TRACKS_URL}/existing-playlist`, { token: accessToken }
    )
    if (!existingPlaylist.data) {
      // CREATE PLAYLIST IN USER'S LIBRARY:
      const data = { name: "Shuffle/gmzi", description: "made to shuffle" }
      const newPlaylist = await axios.post(
        `https://api.spotify.com/v1/users/${userID}/playlists`,
        data,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      // const newPlaylistUrl = newPlaylist.data.external_urls;
      // const newPlaylistLink = newPlaylist.data.href;
      const newPlaylistId = newPlaylist.data.id;
      // TODO: add a progress bar with the arr.length in helper
      fillPlaylist(fullArray, newPlaylistId, accessToken)
      return
    }
    // UPDATE PLAYLIST IN USERS LIBRARY
    const existingPLaylistID = existingPlaylist.data
    console.log(existingPLaylistID)
    console.log(fullArray)
    const updatePL = await axios.post(
      `${TRACKS_URL}/update`, { token: accessToken, tracks: JSON.stringify(fullArray), id: existingPLaylistID }
    )
    return;
    /* GRAB 'fullArray', send it to server in req body, in server, get all tracks
    from existingPlaylistID, compare them with fullArray:
    if fullArray.includes(track) && existingPlaylistTracks.includes(track){
      throw it away
    } else {
      add it to mixed array,
      update existingPL with mixed array
    }
    // GET ALL TRACKS FROM EXISTING PL, COMPARE THEM WITH 
    // TRACKS IN LIBRARY
    return;
    // IF NOT, CONTINUE:
    */
  }


  return (
    <QueueContext.Provider value={{ queue }}>
      <div className="Controller-dashboard">
        <Dashboard
          accessToken={accessToken}
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
