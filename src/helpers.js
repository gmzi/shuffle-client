import axios from 'axios';
import MixcloudPlayer from 'react-player/mixcloud';

async function retrieveTracks(url, token, setState1, setState2) {
  const items = [];
  await axios
    .post(`${url}/playlists`, { token })
    .then((res) => {
      res.data.map((i) => items.push(i));
      setState1(true);
    })
    .then(axios.post(`${url}/likedtracks`, { token }))
    .then((res) => {
      res.data.map((i) => items.push(i));
      setState2(true);
    });
  return items;
}

export default { retrieveTracks };
