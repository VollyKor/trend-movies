import './App.css';
import { Route, Switch } from 'react-router-dom';
import MoviesView from './Components/Movies/MoviesView';
import NavBar from './Components/NavBar/NavBar';
import Container from './service/Container';
import HomeView from './Components/Home/HomeView';

// const ViewStatus = {
//   IDLE: 'idle'
//   PENDING: 'pending'
//   RESOLVED: 'resolved'
//   REJECTED: 'rejected'
// }

function App() {
  // const [status, setStatus] = useState('idle')

  return (
    <Container>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <HomeView />
        </Route>
        <Route path="/movies">
          <MoviesView />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
