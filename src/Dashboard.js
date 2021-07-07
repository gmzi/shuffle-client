import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import bootstrap from 'bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import Track from './Track';
import shuffle from './icons/shuffle.png';
import './Dashboard.css';

const spotifyApi = new SpotifyWebApi({
  clientId: 'b4217743307a432d807c1e5840dde3a2',
});

const Dashboard = ({
  accessToken,
  userTracks,
  chooseTrack,
  playAll,
  shuffleAll,
}) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeShuffle, setActiveShuffle] = useState(false);

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
          <Button
            onClick={playAll}
            size="sm"
            type="Button"
            className="btn-player"
          >
            Play All
          </Button>
          {!activeShuffle ? (
            <Button onClick={shuffleAll} className="btn-player">
              Shuffle
            </Button>
          ) : (
            <Button onClick={'#'} className="btn-player">
              STOP SHUFFLE
            </Button>
          )}
          <Button onClick="#" className="btn-player disabled">
            Extra Shuffle
          </Button>
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
          {userTracks ? (
            Object.entries(userTracks).map(([key, value]) => {
              return (
                <Track key={key} track={value} chooseTrack={chooseTrack} />
              );
            })
          ) : (
            <div>
              <p>No tracks yet</p>
            </div>
          )}
        </Container>
      </Container>
    </div>
  );
};

export default Dashboard;
