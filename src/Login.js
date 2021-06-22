import React from 'react';
import { Container } from 'react-bootstrap';
import Nav from './Nav';

const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=b4217743307a432d807c1e5840dde3a2&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-read-collaborative';

export default function Login() {
  return (
    <div>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <a className="btn btn-success btn-lg" href={AUTH_URL}>
          Login With Spotify
        </a>
      </Container>
    </div>
  );
}

// export default function Login() {
//   return (
//     <div>
//       <Nav>
//         <a className="btn btn-success btn-lg" href={AUTH_URL}>
//           Login With Spotify
//         </a>
//       </Nav>
//     </div>
//   );
// }
