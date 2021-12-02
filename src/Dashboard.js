import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import Track from './Track';
import './Dashboard.css';
// import QueueContext from './QueueContext';

const ID = `${process.env.REACT_APP_CLIENT_ID}`

const spotifyApi = new SpotifyWebApi({
  clientId: ID,
});

const Dashboard = ({
  accessToken,
  playlistsTracks,
  likedTracks,
  chooseTrack,
  playAll,
  shuffleAll,
  smartShuffle,
  exportPlaylist
}) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // -----------------------------------------------------------------
  // SEARCH FORM
  // Authenticate search requests from API
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);
  // SEARCH LOGIC
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
            artists: [track.artists[0].name],
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, accessToken]);
  // -----------------------------------------------------------------
  // TRACK RENDERING LOGIC. MAKE IT MODULAR WO WHEN ONE ROUTE LOADS THROW THE TRACKS
  // TO LIST, WHILE BROWSER KEEPS WORKING ON PENDING TRACKS. 

  return (
    <div className="Dashboard-wrapper">
      <Container className="Dashboard d-flex flex-column">
        <Form.Control
          as="input"
          type="search"
          placeholder="Search Songs/Artists"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="Form"
        />
        <div className="btns-container">
          <Button onClick={playAll} type="Button" className="btn-player">
            Play All
          </Button>

          <Button onClick={shuffleAll} type="Button" className="btn-player">
            Shuffle
          </Button>
          <Button onClick={smartShuffle} className="btn-player disabled">
            Smart Shuffle
          </Button>
          <Button onClick={exportPlaylist} className="btn-player disabled">
            Export playlist
          </Button>
          <div>
            <p className="text-light">Total tracks: {Object.keys(playlistsTracks).length + Object.keys(likedTracks).length}</p>
          </div>
        </div>
        <Container
          className="tracks-container flex-grow-1 my-2"
          style={{ overflowY: 'auto' }}
        >
          {searchResults.length ? (
            <>
              <div className="search-container">
                <h6 className="search-header">Search results</h6>
                {searchResults.map((track) => (
                  <Track
                    track={track}
                    key={track.uri}
                    chooseTrack={chooseTrack}
                  />
                ))}
              </div>
              <h6 className="search-header">Your library</h6>
            </>
          ) : (
            <div></div>
          )}
          {playlistsTracks ? (
            Object.entries(playlistsTracks).map(([key, value]) => {
              return (
                <Track key={key} track={value} chooseTrack={chooseTrack} />
              );
            })
          ) : (
            <div>
              <p>No tracks yet</p>
            </div>
          )}
          {likedTracks ? (
            Object.entries(likedTracks).map(([key, value]) => {
              return (
                <Track key={key} track={value} chooseTrack={chooseTrack} />
              )
            })
          ) : (
            null
          )}
        </Container>
      </Container>
    </div>
  );
};

export default Dashboard;
