// Get tracks in an album
spotifyApi
  .getAlbumTracks('41MnTivkwTO3UUJ8DrqEJJ', { limit: 5, offset: 1 })
  .then(
    function (data) {
      console.log(data.body);
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );

// Get a user's playlists
spotifyApi.getUserPlaylists('thelinmichael').then(
  function (data) {
    console.log('Retrieved playlists', data.body);
  },
  function (err) {
    console.log('Something went wrong!', err);
  }
);

// Get tracks in the signed in user's Your Music library
spotifyApi
  .getMySavedTracks({
    limit: 2,
    offset: 1,
  })
  .then(
    function (data) {
      console.log('Done!');
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );

// Get albums in the signed in user's Your Music library
spotifyApi
  .getMySavedAlbums({
    limit: 1,
    offset: 0,
  })
  .then(
    function (data) {
      // Output items
      console.log(data.body.items);
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );

// Toggle Shuffle For User’s Playback
spotifyApi.setShuffle(true).then(
  function () {
    console.log('Shuffle is on.');
  },
  function (err) {
    //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
    console.log('Something went wrong!', err);
  }
);

//CHAINING CALLS
// track detail information for album tracks
spotifyApi
  .getAlbum('5U4W9E5WsYb2jUQWePT8Xm')
  .then(function (data) {
    return data.body.tracks.map(function (t) {
      return t.id;
    });
  })
  .then(function (trackIds) {
    return spotifyApi.getTracks(trackIds);
  })
  .then(function (data) {
    console.log(data.body);
  })
  .catch(function (error) {
    console.error(error);
  });

function getSaved(accessToken, active = true, offset = 0, storage) {
  if (active) {
    spotifyApi.getMySavedTracks({ limit: 20, offset: offset }).then((res) => {
      if (!res.body.next) {
        active = false;
      }
      res.body.items.map((t) => storage.push(t));
      return getSaved(accessToken, active, (offset += 20), storage);
    });
  }
  return;
}

// Start/Resume a User's Playback
spotifyApi.play().then(
  function () {
    console.log('Playback started');
  },
  function (err) {
    //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
    console.log('Something went wrong!', err);
  }
);

// Pause a User's Playback
spotifyApi.pause().then(
  function () {
    console.log('Playback paused');
  },
  function (err) {
    //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
    console.log('Something went wrong!', err);
  }
);

// Toggle Shuffle For User’s Playback
spotifyApi.setShuffle(true).then(
  function () {
    console.log('Shuffle is on.');
  },
  function (err) {
    //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
    console.log('Something went wrong!', err);
  }
);

// Async Await Recursive Function
const reqsAsyncWait = async (requests = [], data = []) => {
  if (requests instanceof Array && requests.length > 0) {
    const config = {
      method: requests[0].method,
    };

    return await fetch(requests[0].url, config).then(async (response) => {
      const json = response.json();
      if (response.ok) {
        const jsonData = await json;
        return await reqsAsyncWait(requests.slice(1), [...data, ...[jsonData]]);
      }
      // not this object may be empty if no err msg
      throw await json;
    });
  }
  return data;
};

// Init
try {
  console.log(
    await reqsAsyncWait(
      [
        {
          url: 'https://jsonplaceholder.typicode.com/todos/1',
          method: 'get',
        },
        {
          url: 'https://jsonplaceholder.typicode.com/todos/3',
          method: 'get',
        },
        {
          url: 'https://jsonplaceholder.typicode.com/todos/7',
          method: 'get',
        },
      ],
      []
    )
  );
} catch (error) {
  console.log(error);
}

async function getSaved(caller, active = true, offset = 0, allTracks = []) {
  if (active) {
    return await caller
      .getMySavedTracks({ limit: 20, offset: offset })
      .then(async (res) => {
        if (!res.body.next) {
          active = false;
          return allTracks;
        }
        res.body.items.map((t) => allTracks.push(t));
        return await getSaved(caller, active, (offset += 20), allTracks);
      });
  }
  console.log('vino por acá');
  return Promise.all(calls);
}


