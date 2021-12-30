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
                        {/* <form action={uri}>
                            <input className="link" type="submit" alt="playlist" value="Open in Spotify" />
                        </form> */}
                        <a className="link" href={uri}>Open in Spotify </a>
                        <button className="link" onClick={hideAlert}>Dismiss</button>
                        {/* <iframe src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> */}
                    </div>
                </div>
            </div>
        )
    }
    return <div></div>;
}

export default Alert;