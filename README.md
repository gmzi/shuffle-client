# Spotify shuffle

All your Spotify songs in one place to shuffle them.

Live demo: https://shuffle-client.vercel.app

## USE FLOW
On landing page, users get recommended songs for current time and day. Click on track opens Spotify app and plays it. 
On login with their Spotify account, users get a single list with all their songs, retrieved from their Liked Songs list and all their playlists (all users album's songs TBD).
Users can click any song to play it individually, or play them all in the displayed order with button, or export all of them as a playlist to be played in Spotify app.
Users can search tracks by title or artist. 

## APIS
- Spotify API for user auth, user playlists retrieval and creation, track recommendations by day and time through seeded data.

## LIBRARIES
- [Spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node) for track retrieval.
- [React-spotify-web-playback](https://github.com/gilbarbara/react-spotify-web-playback) to play tracks.

## DATABASE
- PostgreSQL database stores played tracks sorted by time and day of week. On landing page, app seeds the Spotify Recommendations API endpoint and retrieves four tracks recommended for current time and day.

## STACK
- React frontend.
- Node-express backend: [server](https://github.com/gmzi/shuffle-server)
- PostgreSQL database.

## USAGE
- Register a new app at [Spotify Dashboard](https://developer.spotify.com/dashboard/) 
- Set process.env.REACT_APP_CLIENT_ID with credential provided by Spotify.
- Set process.env.REACT_APP_REDIRECT_URI to localhost or desired dev url. 
- Deploy [server](https://github.com/gmzi/shuffle-server), set process.env.REACT_APP_BASE_URL to this url.
- Create [database](https://github.com/gmzi/shuffle-db). Deploy it, and set process.env.REACT_APP_TRACKS_URL to this url. 
- Run with `npm start`. 

## TODOS

- [ ] FEATURE: user select playlists to add to the mix . 
- [x] FEATURE: Export playlist. Allow users to export a new playlist with all their tracks in one place, so users can play it from the Spotify player.
- [ ] UI: on search, focus on search results. 
- [ ] UI: on shuffle button press, render the tracks in the order they are being played in player queue, with cool animation. On "re-shuffle", repeat the process. 
- [ ] FEATURE: Advanced shuffle. Shuffle all user songs with advanced criteria (exclude terms, select from given playlists, shuffle from group of albums)
- [ ] Retrieve tracks from all saved albums and add them to the list. (CREATE /albumtracks in heroku server, then add the request in client/helpers/retrieveTracks )
- [ ] In shufle/playAll, set logic to refill queue after 200 tracks have been played
- [ ] On shuffle or PlayAll, be able to select a track and play it inmediately, and continue with the previous queue afterwards.
- [ ] distribute the requests and returns on the server in order to render the whole list fast and by small sections.
- [ ] Advanced shuffle: design compartiments to shuffle from selected playlists/albums/liked
songs / with genre/without genre with artist/without artist


## REFERENCE
Valuable guidance and inspiration were found in this [tutorial](https://www.youtube.com/watch?v=Xcet6msf3eE) made by @DevSimplified