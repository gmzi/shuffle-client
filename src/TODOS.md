[] routes
[] media queries for mobile
[] plot line: get all your Spotify songs in one place, and shuffle them all.

- Shuffle accross all the songs in your Spotify library (playlists, liked songs, albums)
  [] video demo

[] FEATURE: grab all user's tracks, create a new "All my songs" playlist and add it to user's library.

[] OPTIMIZATION: split the gathering of the tracks in: 1- Playlists, 2-Liked tracks, 3-Album tracks. Render each batch from a different server route, and send it to client in parts.

[] In shufle/playAll, set logic to refill queue after 200 tracks have been played

[] On shuffle or PlayAll, be able to select a track and play it inmediately, and continue with the previous queue afterwards.

[] distribute the requests and returns on the server in order to render the whole list fast and by small sections.

[] Retrieve tracks from all saved albums and add them to the list.

[] Advanced shuffle: design compartiments to shuffle from selected playlists/albums/liked
songs / with genre/without genre
