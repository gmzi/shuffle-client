import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useQueue = (accessToken) => {
  const [userTracks, setUserTracks] = useState({});
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    axios.get('http://localhost:3001/tracks').then((res) => {
      setUserTracks(res.data);
    });
  }, [accessToken]);

  function chooseTrack(track) {
    const newQueue = [...queue];
    newQueue.unshift(track.uri);
    setQueue((queue) => newQueue);
    // setPlayingTrack(track);
    // setSearch('');
  }
  console.log(queue);

  const addTrack = () => setQueue((queue) => ['hi', ...queue]);
  const addShuffledList = () => setQueue((queue) => ['hihi', ...queue]);

  return [userTracks, queue, chooseTrack];
};

export default useQueue;
