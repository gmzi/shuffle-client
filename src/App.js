import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Dashboard from './Dashboard';
import Nav from './Nav';
import Routes from './Routes';
import Tryme from './Tryme';
import useAuth from './useAuth';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return code ? <Routes code={code} /> : <Login />;
}

export default App;

// export default function App() {
//   const code = new URLSearchParams(window.location.search).get('code');
//   return <div>{code ? <Dashboard code={code} /> : <Login />}</div>;
// }
