# Spotify shuffle

All your Spotify library songs in one place to shuffle them.

Live demo: https://shuffle-client.vercel.app

## USE FLOW

Users log in with their Spotify account, and will get a single list with all their songs, retrieved from their Liked songs list and all their playlists (all librarys album's songs TBD).
On that main list of songs, users can choose any song to play it individually, can play them all in the displayed order, or can shuffle them.
Users can also use the search form to search songs by title or artist.
On landing page, users get recommended songs for this time and day.

## API and DATABASE

- Uses Spotify API for user auth, user playlists, user liked songs and user saved albums.
- Uses Spotify player (with library) to play tracks.
- Uses database to store selected tracks with time and day of week. Use those tracks from database to seed the Spotify Recommendations API endpoint.

## LIBRARIES

- Spotify-web-api-node for track retrieval.
- React-spotify-web-playback to play tracks.

## STACK

- React frontend.
- Node-express severs (one for auth process, another for tracks retrieval).
- Postgresql database.

## TODOS

- [ ] FEATURE: Export playlist. Allow users to export a new playlist with all their tracks in one place, so users can play it from the Spotify player.
- [ ] Advanced shuffle. Shuffle all user songs with advanced criteria (exclude terms, select from given playlists, shuffle from group of albums)
- [ ] Retrieve tracks from all saved albums and add them to the list. (CREATE /albumtracks in heroku server, then add the request in client/helpers/retrieveTracks )
- [ ] In shufle/playAll, set logic to refill queue after 200 tracks have been played
- [ ] On shuffle or PlayAll, be able to select a track and play it inmediately, and continue with the previous queue afterwards.
- [ ] distribute the requests and returns on the server in order to render the whole list fast and by small sections.
- [ ] Advanced shuffle: design compartiments to shuffle from selected playlists/albums/liked
songs / with genre/without genre with artist/without artist
