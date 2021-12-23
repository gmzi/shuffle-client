import React, { useState } from 'react';
import './Alert.css';

const Alert = ({ message, uri }) => {

    return (
        <div className="alert">
            <div className="alert-wrapper">
                <p>{message}</p>
                <a href={uri} alt="playlist">Go to playlist</a>
            </div>
        </div>
    )
}

export default Alert;