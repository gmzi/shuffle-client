import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ accessToken, trackUri, shuffleAll }) {
  const [play, setPlay] = useState(true);
  const [activeShuffle, setActiveShuffle] = useState(false);
  const [track, setTrack] = useState();
  const [queue, setQueue] = useState([
    'spotify:track:34OVc2NvUGP5jGzPcME2ge',
    'spotify:track:15leoTFYGkjqJWJ37FFjU0',
    'spotify:track:0Ht91J9ytTO5JUu1ZSslUe',
    'spotify:track:0Ht91J9ytTO5JUu1ZSslUe',
    'spotify:track:0Ht91J9ytTO5JUu1ZSslUe',
    'spotify:track:0Ht91J9ytTO5JUu1ZSslUe',
    'spotify:track:0Ht91J9ytTO5JUu1ZSslUe',
    'spotify:track:0Ht91J9ytTO5JUu1ZSslUe',
  ]);

  useEffect(() => {
    console.log('Corre EFFFECCCT');
  }, [activeShuffle]);

  if (!accessToken) return null;

  function activateShuffle() {
    setActiveShuffle(true);
  }

  function handleShuffle(state) {
    function giveMeTrack(list) {
      const idx = Math.floor(Math.random() * list.length);
      return list[idx];
    }

    if (activeShuffle) {
      // const newTrack = shuffleAll()
      const newTrack = giveMeTrack(queue);
      setPlay(true);
      setTrack((track) => newTrack);
      if (state.isPlaying) {
        console.log('NEXT TRACKS SETTED');
        state.nextTracks.push(queue[1]);
        // setQueue(function () {
        //   queue.shift();
        // });
      }
      if (!state.isPlaying) {
        if (
          state.progressMs > 0 &&
          state.progressMs <= state.track.durationMs
        ) {
          console.log('STOPPED DURING TRACK');
          setPlay(false);
          return;
        }
        if (state.nextTracks.length) {
          console.log(state.nextTracks.length);
          state.previousTracks.push(state.track);
          state.track = state.nextTracks[0];
          setPlay(true);
          setTrack((track) => state.track);
        } else {
          console.log('hola');
          return;
        }
      }
    } else {
      setTrack((track) => 'spotify:track:15leoTFYGkjqJWJ37FFjU0');
    }
  }

  function playAll() {
    // setContinuousPlay(true);
    // setPlayingTrack(userTracks[0]);
  }

  function stopShuffle() {
    // setPlayingTrack(null);
  }

  function nextTrack(state) {
    console.log(state);
    // state.previousTracks = state.track;
    // state.track = ['spotify:track:0Ht91J9ytTO5JUu1ZSslUe'];
    // setTrack(state.track);

    // if (state.isPlaying) {
    //   state.nextTracks.push(trackList[0]);
    //   trackList.shift();
    // }
    // if (!state.isPlaying) {
    //   if (state.nextTracks.length) {
    //     state.previousTracks.push(state.track);
    //     state.track = state.nexTracks[0];
    //     setTrack(state.track);
    //   }
    // }

    // if (trackList.length) {
    //   state.nextTrack = trackList[0];
    //   if (state.nextTrack) {
    //     state.track = trackList[0];
    //   }
    // }
  }
  return (
    <div>
      <div>
        {!activeShuffle ? (
          <button onClick={activateShuffle}>Shuffle all your songs</button>
        ) : (
          <button onClick={stopShuffle}>STOP SHUFFLE</button>
        )}
      </div>
      <div>
        <button onClick={playAll}>Play All</button>
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
          handleShuffle(state);
        }}
        // callback={(state) => {
        //   if (state.isPlaying) {
        //     if (!activeShuffle) {
        //       setPlay(false);
        //       return;
        //     }
        //     // HERE SHOULD MAKE THE SCHECK OF THE PLAY STATUS, AND CALL SHUFFLE AGAIN,
        //     // CHECKOUT ALTERNATE LIBRARY WITH PLAYBACK AUTOUPDATE SET TO TRUE
        //     if (state.progressMs > state.track.durationMs - 2) {
        //       console.log('state.progress ' + state.progressMs);
        //       console.log('CAQUITAAAAAAAAAA');
        //     }
        //   } else {
        //     console.log('play stopped');
        //     // if (state.progressMs > state.track.durationMs - 100) {
        //     //   console.log('state.progress ' + state.progressMs);
        //     //   console.log('CAQUITAAAAAAAAAA');
        //     // }
        //     console.log(state.progressMs);
        //     console.log(state.track.durationMs - 1);
        //     if (!activeShuffle) {
        //       setPlay(false);
        //       return;
        //     } else {
        //       console.log('tamo activo', play);
        //       if (track) {
        //         console.log('hay track');
        //         setPlay(false);
        //       } else {
        //         console.log('NO HAY TRACK');
        //         handleShuffle();
        //       }
        //       // state.nextTracks = ['spotify:track:4VBVF2XmwNHorTfnL2IIHk'];
        //       // uris = state.nextTracks[0];
        //     }
        //   }
        // THIS WORKED:
        // if (!state.isPlaying && activeShuffle) {
        //   debugger;
        //   handleShuffle();
        //   setPlay(false);
        // } else {
        //   setPlay(false);
        // }
        // }}
        // uris={trackUri ? [trackUri] : []}
        uris={track ? track : trackUri}
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
