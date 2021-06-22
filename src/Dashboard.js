import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import Player from './Player';
import TrackSearchResult from './TrackSearchResult';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';

const spotifyApi = new SpotifyWebApi({
  clientId: 'b4217743307a432d807c1e5840dde3a2',
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [wannaShuffle, setWannaShuffle] = useState(false);
  // const [lyrics, setLyrics] = useState('');

  const [userTracks, setUserTracks] = useState([]);

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch('');
    // setLyrics('');
  }

  // function shuffleAll() {
  //   if (userTracks.length) {
  //     setWannaShuffle(true);
  //     const idx = Math.floor(Math.random() * userTracks.length);
  //     chooseTrack(userTracks[idx]);
  //   }
  // }

  function shuffleAll() {
    if (userTracks.length) {
      setWannaShuffle(true);
      const idx = Math.floor(Math.random() * userTracks.length);
      chooseTrack(userTracks[idx]);
    }
  }

  function stopShuffle() {
    setWannaShuffle(false);
    setPlayingTrack(null);
  }

  // function stopShuffle() {
  //   spotifyApi.pause().then(
  //     function () {
  //       setWannaShuffle(false);
  //       setPlayingTrack(null);
  //     },
  //     function (err) {
  //       //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
  //       console.log('Something went wrong!', err);
  //     }
  //   );
  // }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, accessToken, wannaShuffle]);

  useEffect(() => {
    if (!accessToken) return;
    /** getSaved(accessToken); */
    axios.get('http://localhost:3001/tracks').then((res) => {
      setUserTracks(res.data);
    });
  }, [accessToken]);

  /**
  function getSaved(accessToken, active = true, offset = 0, allTracks = []) {
    if (accessToken !== undefined) {
      if (active) {
        spotifyApi
          .getMySavedTracks({ limit: 20, offset: offset })
          .then((res) => {
            if (!res.body.next) {
              active = false;
              console.log(allTracks[0]);
              setUserTracks(
                allTracks.map((track) => {
                  const smallestAlbumImage = track.track.album.images.reduce(
                    (smallest, image) => {
                      if (image.height < smallest.height) return image;
                      return smallest;
                    },
                    track.track.album.images[0]
                  );
                  const artists = track.track.artists.map((a) => {
                    return a.name;
                  });

                  return {
                    artist: artists,
                    title: track.track.name,
                    uri: track.track.uri,
                    albumUrl: smallestAlbumImage.url,
                  };
                })
              );
            }
            res.body.items.map((t) => allTracks.push(t));
            return getSaved(accessToken, active, (offset += 20), allTracks);
          });
      }
      return;
    }
  }
   */

  return (
    <Container className="d-flex flex-column py-2" style={{ height: '100vh' }}>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: 'auto' }}>
        {searchResults.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        <div>
          {!wannaShuffle ? (
            <button onClick={shuffleAll}>Shuffle all your songs</button>
          ) : (
            <button onClick={stopShuffle}>STOP SHUFFLE</button>
          )}
        </div>
        <div>
          <button onClick="#">Advanced shuffle</button>
        </div>
        {Object.entries(userTracks).map(([key, value]) => {
          return (
            <TrackSearchResult
              key={value.uri}
              track={value}
              chooseTrack={chooseTrack}
            />
          );
        })}
      </div>
      <div>
        <Player
          accessToken={accessToken}
          trackUri={playingTrack?.uri}
          shuffleAll={shuffleAll}
          wannaShuffle={wannaShuffle}
        />
      </div>
    </Container>
  );
}
