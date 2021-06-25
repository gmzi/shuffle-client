import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Routes from './Routes';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return code ? <Routes code={code} /> : <Login />;
}

export default App;
