import { useState, useEffect, useContext } from 'react';
import QueueContext from './QueueContext';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ accessToken, playAll }) {
  const { queue, mode } = useContext(QueueContext);

  useEffect(() => {}, [queue]);

  // if (!accessToken) return null;

  function checkBatch(state) {
    if (state.nextTracks.length === 1) {
      playAll(200, queue.length);
    }
  }

  return (
    <div>
      <SpotifyPlayer
        token={accessToken}
        magnifySliderOnHover={true}
        play={true}
        syncTimeout={true}
        callback={(state) => {
          // if (mode === 'playAll') {
          //   checkBatch(state);
          // }
          // console.log(state);
        }}
        // uris={'spotify:track:0Ht91J9ytTO5JUu1ZSslUe'}
        offset={0}
        uris={queue}
        autoplay={true}
        styles={{
          activeColor: '#fff',
          bgColor: '#333',
          color: '#fff',
          loaderColor: '#fff',
          sliderColor: '#1cb954',
          trackArtistColor: '#ccc',
          trackNameColor: '#fff',
        }}
      />
    </div>
  );
}
