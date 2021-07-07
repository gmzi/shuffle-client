import React from 'react';
import './Track.css';

export default function Track({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <div
      className="Track d-flex m-2 align-items-center"
      style={{ cursor: 'pointer' }}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} style={{ height: '64px', width: '64px' }} />
      <div className="details ml-3">
        <div>{track.title}</div>
        <div className="details text-muted">{track.artists}</div>
      </div>
    </div>
  );
}