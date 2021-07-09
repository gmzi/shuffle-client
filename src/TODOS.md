[] media queries for mobile
[] plot line: get all your Spotify songs in one place, and shuffle them all.

- Shuffle accross all the songs in your Spotify library (playlists, liked songs, albums)

[] video demo

[] FEATURE: grab all user's tracks, create a new "All my songs" playlist and add it to user's library.

[] Retrieve tracks from all saved albums and add them to the list. (CREATE /albumtracks in heroku server, then add the request in client/helpers/retrieveTracks )

[] In shufle/playAll, set logic to refill queue after 200 tracks have been played

[] On shuffle or PlayAll, be able to select a track and play it inmediately, and continue with the previous queue afterwards.

[] distribute the requests and returns on the server in order to render the whole list fast and by small sections.

[] Advanced shuffle: design compartiments to shuffle from selected playlists/albums/liked
songs / with genre/without genre
