import { useState, useEffect, useContext } from 'react';
import { QueueContext } from './QueueContext';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ accessToken, queue, mode, playAll }) {
  const [play, setPlay] = useState(true);

  // useEffect(() => {
  //   setPlay(true);
  //   setTrack(playTrack);
  // }, [chooseTrack, track]);

  if (!accessToken) return null;

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
        play={play}
        syncTimeout={true}
        callback={(state) => {
          if (mode === 'playAll') {
            checkBatch(state);
          }
          // if (mode === 'playAll' && state.nextTracks.length < 2) {
          //   playAll(201, queue.length - 1);
          // }
          // if (state.isPlaying && state.nextTracks.length < 2 && mode === 'playAll') {
          //   console.log('corre esto');
          //   playAll(201, queue.length);
          // }
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
