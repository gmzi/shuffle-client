import React from 'react';
import Track from './Track';

export default function Tracklist({ listName, tracks, chooseTrack }) {
    const trackList = Object.entries(tracks).map(([key, value]) => {
        return (
            <Track key={key} track={value} chooseTrack={chooseTrack} />
        );
    })
    return (
        <div>
            <h6>Form your {listName}</h6>
            {trackList}
        </div>
    )
}