import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import Dashboard from './Dashboard';
import Player from './Player';
import Progressbar from './Progressbar';
import QueueContext from './QueueContext';
import { fillPlaylist, emptyPlaylist } from './helpers';
import './Controller.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const TRACKS_URL = process.env.REACT_APP_TRACKS_URL;

const Controller = ({ accessToken }) => {

  const [queue, setQueue] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState();
  const [max, setMax] = useState()

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

    if (loadingProgress) {
      alert('export in progress')
      return;
    }

    // CHECK IF ALL TRACKS ARE LOADED, IF NOT, DISPLAY ALERT
    if (!playlistsTracks || !likedTracks) {
      alert('songs are on the way, please retry after they completely load')
      return;
    }

    // MAKE AN ARRAY WITH ALL LOCAL TRACKS
    const playlists = Object.values(playlistsTracks).map((t) => t.uri)
    const liked = Object.values(likedTracks).map((t) => t.uri)
    const localTracks = [...playlists, ...liked]

    // SET MAX VALUE FOR PROGRESS LOADING:
    setMax(localTracks.length)

    // GET USER ID:
    const user = await axios.get(
      'https://api.spotify.com/v1/me',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const userID = user.data.id;

    // CHECK IF USER ALREADY HAS A SHUFFLE PLAYLIST
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
      fillPlaylist(localTracks, newPlaylistId, accessToken, setLoadingProgress)
      return
    }

    // IF PLAYLIST EXISTS, UPDATE IT:
    // get tracks and id of user's Shuffle/gmzi playlist:
    const userTracks = existingPlaylist.data.tracks
    const playlistID = existingPlaylist.data.id;
    // Compare userTracks with localTracks:
    console.log(userTracks.length)
    console.log(localTracks.length)
    // const symmetricDifference = userTracks.filter(x => !localTracks.includes(x)).concat(localTracks.filter(x => !userTracks.includes(x)))
    const tracksToAdd = localTracks.filter(t => !userTracks.includes(t))
    // add localTracks to user's Shuffle/gmzi playlist:
    if (tracksToAdd.length) {
      fillPlaylist(tracksToAdd, playlistID, accessToken, setLoadingProgress)
      return;
    }
    return;
  }

  return (
    <div>
      {loadingProgress ? (
        <Progressbar tracksLoaded={loadingProgress} max={max} />
      ) : null}
      <QueueContext.Provider value={{ queue }}>
        <div className="Controller-dashboard">
          <Dashboard
            accessToken={accessToken}
            chooseTrack={chooseTrack}
            playAll={playAll}
            shuffleAll={shuffleAll}
            smartShuffle={smartShuffle}
            exportPlaylist={exportPlaylist}
            loadingProgress={loadingProgress}
          />
        </div>
        <div className="Controller-player">
          <Player accessToken={accessToken} playAll={playAll} />
        </div>
      </QueueContext.Provider>
    </div>
  );
};

export default Controller;
