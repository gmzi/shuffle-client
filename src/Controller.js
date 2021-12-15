import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Player from './Player';
import QueueContext from './QueueContext';
import './Controller.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

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
    // GET USER ID:
    const user = await axios.get(
      'https://api.spotify.com/v1/me',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const userID = user.data.id;

    // CHECK IF USER ALREADY HAS A SHUFFLER PLAYLIST
    // IF THEY DO, UPDATE OR DELETE

    // IF NOT, CONTINUE:

    // CREATE PLAYLIST IN USER'S LIBRARY:
    const data = { name: "Shuffler", description: "made to shuffle" }
    const newPlaylist = await axios.post(
      `https://api.spotify.com/v1/users/${userID}/playlists`,
      data,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
    console.log(newPlaylist.data)
    const newPlaylistUrl = newPlaylist.data.external_urls;
    const newPlaylistLink = newPlaylist.data.href;
    const newPlaylistId = newPlaylist.data.id;

    // ADD ALL TRACKS TO NEW PLAYLIST:
    let fullArray
    if (playlistsTracks && !likedTracks) {
      fullArray = Object.values(playlistsTracks).map((t) => t.uri)
    } else if (playlistsTracks && likedTracks) {
      const playlists = Object.values(playlistsTracks).map((t) => t.uri)
      const liked = Object.values(likedTracks).map((t) => t.uri)
      fullArray = [...playlists, ...liked]
    } else {
      alert('songs are on the way!')
      return;
    }
    playlistFiller(fullArray, newPlaylistId, accessToken)
  }

  async function playlistFiller(arr, playlistID, accessToken) {
    console.log(arr.length)
    const copy = [...arr]
    let tracks;
    if (copy.length > 0 && copy.length < 100) {
      tracks = {
        "uris": copy
      }
      // make axios request with copy
      const addTracks = await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
        tracks,
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      )
      return
    }
    if (copy.length > 100) {
      tracks = {
        "uris": copy.length > 200 ? copy.splice(99, 100) : copy.splice(99, copy.length - 1)
      }
      const addTracks = await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
        tracks,
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      )
      return playlistFiller(copy, playlistID, accessToken)
    }
    return
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
