import { useState, useEffect, useContext } from 'react';
import QueueContext from './QueueContext';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ accessToken, playAll }) {
  const [play, setplay] = useState(false);
  const [playerError, setPlayerError] = useState()
  const { queue } = useContext(QueueContext);

  useEffect(() => {
    setplay(true);
  }, [queue]);

  function checkBatch(state) {
    if (state.nextTracks.length === 1) {
      playAll(200, queue.length);
    }
  }

  const player = <SpotifyPlayer
    token={accessToken}
    magnifySliderOnHover={true}
    play={play}
    syncTimeout={true}
    callback={(state) => {
      setplay(false);
      if (state.status === "ERROR") {
        setPlayerError(state.track.uri)
      }
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

  if (playerError) {
    return (
      <div className="alert-wrapper mt-4">
        <div className="links-wrapper">
          <a className="link" href={playerError}>Open in Spotify App</a>
        </div>
      </div>
    )
  }

  return (
    <div className="player-wrapper">{player}</div>
  )

}
