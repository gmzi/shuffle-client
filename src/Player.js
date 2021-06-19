import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({
  accessToken,
  trackUri,
  shuffleAll,
  wannaShuffle,
}) {
  const [play, setPlay] = useState(false);
  const [activeShuffle, setActiveShuffle] = useState(false);

  useEffect(() => {
    setPlay(true);
    setActiveShuffle(wannaShuffle);
  }, [trackUri]);

  if (!accessToken) return null;

  function handleShuffle(state, play) {
    shuffleAll();
  }

  return (
    <SpotifyPlayer
      token={accessToken}
      magnifySliderOnHover={true}
      showSaveIcon
      play={play}
      callback={(state) => {
        if (!state.isPlaying && activeShuffle) {
          handleShuffle();
          setPlay(false);
        } else {
          setPlay(false);
        }
      }}
      uris={trackUri ? [trackUri] : []}
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
  );
}
