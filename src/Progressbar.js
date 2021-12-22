import React, { useState } from 'react';
import './Progressbar.css';

const Progressbar = ({ tracksLoaded, max }) => {

    const progressValue = max - tracksLoaded;
    console.log(progressValue)

    return (
        <div className="progress">
            <div className="progress-wrapper">
                <label htmlFor="export-playlist">Export progress:</label>
                <progress id="export-playlist" value={progressValue} max={max}>{tracksLoaded} tracks exported</progress>
            </div>
        </div>
    )
}

export default Progressbar;