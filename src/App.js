import './App.css';
import { lazy, useState, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import GoBackButton from './Components/Movies/GoBackButton/GoBackButton';
import Container from './service/Container';
import NotFoundView from './Components/NotFoundView/NotFoundView';
import request from './service/apiRequest';

// const ViewStatus = {
//   IDLE: 'idle'
//   PENDING: 'pending'
//   RESOLVED: 'resolved'
//   REJECTED: 'rejected'
// }

const MoviesView = lazy(() =>
  import('./Components/Movies/MoviesView' /* webpackChunkName: 'MoviesView' */),
);

const HomeView = lazy(() =>
  import('./Components/Home/HomeView' /* webpackChunkName: 'HomeView' */),
);

const MovieDetailView = lazy(() =>
  import(
    './Components/Movies/MovieDetailView/MovieDetailView' /* webpackChunkName: 'MovieDetailView' */
  ),
);

const NavBar = lazy(() =>
  import('./Components/NavBar/NavBar' /* webpackChunkName: 'NavBar' */),
);

function App() {
  // const [status, setStatus] = useState('idle')
  const [data, setData] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search).get('query');

    if (searchParams !== null) {
      request.searchFilms(searchParams).then(data => {
        setData(data);
      });
    }
  }, [location.search]);

  return (
    <Container>
      <Suspense fallback={<div> Подождите, Загружаю...</div>}>
        <NavBar />
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>

          <Route path="/movies" exact>
            {!data && <div>пока пусто</div>}
            {data && (
              <>
                <GoBackButton />
                <MoviesView data={data} />
              </>
            )}
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailView />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;
