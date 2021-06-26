import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Routes from './Routes';
import Nav from './Nav';
import ManageAccess from './ManageAccess';
import Dashboard from './Dashboard';

const code = new URLSearchParams(window.location.search).get('code');

export default function App() {
  const [local, setLocal] = useState();

  useEffect(() => {
    const localState = JSON.parse(localStorage.getItem('localToken'));
    setLocal(localState);
  });
  return <div>{local ? <Routes /> : <Login />}</div>;
}

// function App() {
//   const [checkedToken, setCheckedToken] = useState(false);

//   useEffect(() => {
//     function check() {
//       if (localStorage.getItem('localToken')) {
//         console.log(localStorage);
//         setCheckedToken(true);
//       }
//     }
//     check();
//   }, [checkedToken]);

//   return (
//     <div>
//       <Nav />
//       {checkedToken ? (
//         <Routes />
//       ) : (
//         <>{code ? <ManageAccess code={code} /> : <Login />}</>
//       )}
//     </div>
//   );
// }

// export default App;
