import { useState, useEffect, useContext } from 'react';
import QueueContext from './QueueContext';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ accessToken, playAll }) {
  const [play, setplay] = useState(false);
  const { queue } = useContext(QueueContext);

  useEffect(() => {
    setplay(true);
  }, [queue]);

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
          setplay(false);
        }}
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
