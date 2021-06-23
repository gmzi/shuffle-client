import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Dashboard from './Dashboard';
import Nav from './Nav';
import Routes from './Routes';

const code = new URLSearchParams(window.location.search).get('code');
function App() {
  return (
    <div>
      <Nav code={code} />
      <Routes code={code} />
    </div>
  );
}

export default App;

// export default function App() {
//   const code = new URLSearchParams(window.location.search).get('code');
//   return <div>{code ? <Dashboard code={code} /> : <Login />}</div>;
// }
