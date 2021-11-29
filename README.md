# Spotify shuffle

All your Spotify songs in one place to shuffle them.

Live demo: https://shuffle-client.vercel.app

## USE FLOW

Users log in with their Spotify account, and get a single list with all their songs, retrieved from their Liked Songs list and all their playlists (all users album's songs TBD).
On that main list of songs, users can choose any song to play it individually, can play them all in the displayed order, or can shuffle them.
Users can also use the search form to search songs by title or artist. 
On landing page, users get recommended songs for current time and day.

## API 

- Spotify API for user auth, playlists, liked songs and saved albums, recommendations by seeded data.
- Spotify player (with library) to play tracks.


## Database
- PostgreSQL database stores played tracks sorted by time and day of week. On landing page, app seeds the Spotify Recommendations API endpoint and retrieves four tracks recommended for current time and date.

## LIBRARIES

- [Spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node) for track retrieval.
- [React-spotify-web-playback](https://github.com/gilbarbara/react-spotify-web-playback) to play tracks.

## STACK

- React frontend.
- Node-express backend (one server for auth process, another for tracks retrieval), check them out [here](https://github.com/gmzi/shuffle-server).
- Postgresql database.

## Usage

- Create a new app at [Spotify Dashboard](https://developer.spotify.com/dashboard/) 
- Set .env variables CLIENT_ID and CLIENT_SECRET.
Install packages in 'client' and 'server' folders, then: 
- cd to client, `npm start`.
- cd to server, `node server.js`.
- cd to server/api, `node index.js`

## TODOS

- [ ] FEATURE: Export playlist. Allow users to export a new playlist with all their tracks in one place, so users can play it from the Spotify player.
- [ ] Advanced shuffle. Shuffle all user songs with advanced criteria (exclude terms, select from given playlists, shuffle from group of albums)
- [ ] Retrieve tracks from all saved albums and add them to the list. (CREATE /albumtracks in heroku server, then add the request in client/helpers/retrieveTracks )
- [ ] In shufle/playAll, set logic to refill queue after 200 tracks have been played
- [ ] On shuffle or PlayAll, be able to select a track and play it inmediately, and continue with the previous queue afterwards.
- [ ] distribute the requests and returns on the server in order to render the whole list fast and by small sections.
- [ ] Advanced shuffle: design compartiments to shuffle from selected playlists/albums/liked
songs / with genre/without genre with artist/without artist
