import React, { useEffect, useState } from 'react';
import './Alert.css';

const Alert = ({ message, uri }) => {
    const [active, setActive] = useState()

    useEffect(() => {
        if (uri) {
            setActive(true)
        }
    }, [uri])

    function hideAlert() {
        setActive(false)
    }

    if (active) {
        return (
            <div className="alert">
                <div className="alert-wrapper">
                    <p className="message">{message}</p>
                    <div className="links-wrapper">
                        <a className="link" href={uri}>Open in Spotify </a>
                        <button className="link" onClick={hideAlert}>Dismiss</button>
                    </div>
                </div>
            </div>
        )
    }
    return <div></div>;
}

export default Alert;