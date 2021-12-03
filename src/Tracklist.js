import React, { useState } from 'react';
import Track from './Track';

function chooseTrack() {
    console.log('manage this')
}

export default function Tracklist({ listName, tracks }) {
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