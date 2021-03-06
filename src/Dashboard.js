import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import Tracklist from './Tracklist'
import Track from './Track';
import './Dashboard.css';
import { retrievePlaylists, getPlaylistTracks, getLikedTracks } from './helpers';
// import QueueContext from './QueueContext';

const ID = `${process.env.REACT_APP_CLIENT_ID}`
// const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
const TRACKS_URL = `${process.env.REACT_APP_TRACKS_URL}`;

const spotifyApi = new SpotifyWebApi({
  clientId: ID,
});

const Dashboard = ({ accessToken,
  chooseTrack,
  playAll,
  shuffleAll,
  smartShuffle,
  exportPlaylist,
}) => {

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  //----------------------------------------------------------------
  //REQUESTS LOGIC
  const localPlaylistsTracks = JSON.parse(window.localStorage.getItem('userPlaylistsTracks'))
  const localLikedTracks = JSON.parse(window.localStorage.getItem('userLikedTracks'))

  const [playlistsTracks, setPlaylistsTracks] = useState()
  const [likedTracks, setLikedTracks] = useState()
  // const [playlists, setPlaylists] = useState();

  useEffect(() => {
    async function checkLocalStorage() {
      // if no playlists in localStorage, means no tracks at all, so request all playlists:
      if (!localPlaylistsTracks) {

        // get user playlists to loop over them:
        const userPlaylists = await retrievePlaylists(
          `${TRACKS_URL}/playlist-names`,
          accessToken
        )

        // DEV NOTE: display form with all playlists to select which of them add to the mix
        // setPlaylists(userPlaylists)

        await userPlaylists.map(async (id) => {
          const req = axios.get(
            `https://api.spotify.com/v1/playlists/${id}/tracks`,
            // `https://api.spotify.com/v1/playlists/${id}/tracks?fields=total,items(track),limit,next`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
              responseType: 'json',
            }
          )
          await getPlaylistTracks(req, accessToken, setPlaylistsTracks, 'userPlaylistsTracks')
        })

        // ------------------------------------------------------------------------------

        const userLikedTracksRequest = axios.get(
          'https://api.spotify.com/v1/me/tracks?limit=50',
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )

        const userLikedTracks = await getLikedTracks(userLikedTracksRequest, accessToken, setLikedTracks)

        // store user tracks in local
        window.localStorage.setItem(
          'userLikedTracks',
          JSON.stringify(userLikedTracks)
        );
        return;
      }
      // if there are tracks in local, render them without request:
      setPlaylistsTracks(localPlaylistsTracks)
      setLikedTracks(localLikedTracks)
    }
    checkLocalStorage()
  }, [])

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

  const handlePlayAll = () => {
    playAll(playlistsTracks, likedTracks)
  }

  const handleShuffleAll = () => {
    shuffleAll(playlistsTracks, likedTracks)
  }

  const handleExportPlaylist = () => {
    exportPlaylist(playlistsTracks, likedTracks)
  }

  return (
    <div className="Dashboard-wrapper">
      <Container className="Dashboard d-flex flex-column">
        <div className="top-dashboard">
          <>
            <Form.Control
              as="input"
              type="search"
              placeholder="Search Songs/Artists"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="Form"
            />
            <div className="btns-container">
              <Button onClick={handlePlayAll} type="Button" className="btn-player">
                Play All
              </Button>
              <Button onClick={handleShuffleAll} type="Button" className="btn-player">
                Shuffle
              </Button>
              <Button onClick={handleExportPlaylist} className="btn-player">
                Export playlist
              </Button>
              {/* <Button onClick={smartShuffle} className="btn-player disabled">
                Smart Shuffle
              </Button> */}
            </div>
          </>
        </div>
        <div>
          {playlistsTracks && likedTracks ? (
            <>
              {/* <p>Liked tracks: {Object.keys(likedTracks).length}</p>
              <p>Playlists tracks: {Object.keys(playlistsTracks).length}</p> */}
              <p className="text-light">Total tracks: {Object.keys(playlistsTracks).length + Object.keys(likedTracks).length}</p>
            </>
          ) : (null)}
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
            <Tracklist listName={"Playlists"} tracks={playlistsTracks} chooseTrack={chooseTrack} />
          ) : (
            <div>
              <p>Loading tracks from all your playlists</p>
              <Spinner animation="border" variant="success" />
            </div>
          )}
          {likedTracks ? (
            <Tracklist listName={"Liked Songs"} tracks={likedTracks} chooseTrack={chooseTrack} />
          ) : (
            <div>
              <p>Loading tracks from your Liked Songs</p>
              <Spinner animation="border" variant="success" />
            </div>
          )}
        </Container>
      </Container>
    </div >
  );
};

export default Dashboard;
