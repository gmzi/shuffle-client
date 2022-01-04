import React, { useState } from 'react';
import './Progressbar.css';

const Progressbar = ({ progress, max }) => {

    const progressValue = max - progress;

    if (!progressValue || progressValue === max) {
        return (
            <div></div>
        )
    }

    return (
        <div className="progress">
            <div className="progress-wrapper">
                <label htmlFor="export-playlist">Exporting...</label>
                {/* <progress id="export-playlist" value={progressValue} max={max}>{progress}tracks exported</progress> */}
                <progress id="export-playlist" max={max} value={progressValue}></progress>
            </div>
        </div>
    )
}

export default Progressbar;