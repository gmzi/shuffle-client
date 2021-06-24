import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import useQueue from './useQueue';

export default function Player({ accessToken }) {
  const [activeShuffle, setActiveShuffle] = useState(false);
  const [play, setPlay] = useState(true);
  const [userTracks, queue] = useQueue(accessToken);

  useEffect(() => {
    console.log('effect');
    console.log(queue);
  }, [queue]);

  if (!accessToken) return null;

  console.log(queue);

  return (
    <div>
      <div>
        {!activeShuffle ? (
          <button onClick={'#'}>Shuffle all your songs</button>
        ) : (
          <button onClick={'#'}>STOP SHUFFLE</button>
        )}
      </div>
      <div>
        <button onClick={'#'}>Play All</button>
      </div>
      <div>
        <button onClick="#">Advanced shuffle</button>
      </div>

      <SpotifyPlayer
        token={accessToken}
        magnifySliderOnHover={true}
        play={play}
        syncTimeout={true}
        callback={(state) => {
          console.log('hi');
        }}
        uris={'spotify:track:0Ht91J9ytTO5JUu1ZSslUe'}
        // uris={}
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
