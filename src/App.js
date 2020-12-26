import './App.css';
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import MoviesView from './Components/Movies/MoviesView';
import NavBar from './Components/NavBar/NavBar';
import Container from './service/Container';
import HomeView from './Components/Home/HomeView';
import NotFoundView from './Components/NotFoundView/NotFoundView';
import MovieDetailView from './Components/Movies/MovieDetailView/MovieDetailView';
import { useEffect } from 'react';
import request from './service/apiRequest';

// const ViewStatus = {
//   IDLE: 'idle'
//   PENDING: 'pending'
//   RESOLVED: 'resolved'
//   REJECTED: 'rejected'
// }

function App() {
  // const [status, setStatus] = useState('idle')
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);
  useEffect(() => {
    if (query !== '') {
      request.searchFilms(query).then(data => {
        setData(data);
      });
    }
  }, [query]);

  return (
    <Container>
      <NavBar searchQuery={setQuery} />

      <Switch>
        <Route path="/" exact>
          <HomeView />
        </Route>

        <Route path="/movies" exact>
          {!data && <div>пока пусто</div>}
          {data && <MoviesView data={data} />}
        </Route>

        <Route path="/movies/:movieId">
          <MovieDetailView />
        </Route>

        <Route>
          <NotFoundView />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
