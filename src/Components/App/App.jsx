import { lazy, useState, Suspense, useEffect } from 'react';
import { Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from 'components/Routes/PrivateRoute';
import PublicRoute from 'components/Routes/PublicRoute';
import { checkToken } from 'redux/auth/auth.actions';
import './App.css';

import {
  NotFoundView,
  DownloadView,
  EmptyView,
  Container,
  FilmsTable,
} from 'components';
import request from 'service/apiRequest';
import { searchFilms } from 'redux/movies/movies.actions';

const MoviesView = lazy(() =>
  import('components/MoviesView' /* webpackChunkName: 'MoviesView' */),
);
const HomeView = lazy(() =>
  import('components/HomeView/HomeView' /* webpackChunkName: 'HomeView' */),
);
const MovieDetailView = lazy(() =>
  import(
    'components/MovieDetailView/MovieDetailView' /* webpackChunkName: 'MovieDetailView' */
  ),
);
const NavBar = lazy(() =>
  import('components/NavBar/NavBar' /* webpackChunkName: 'NavBar' */),
);

const App = () => {
  const [data, setData] = useState(null);
  const movies = useSelector(state => state.movies.trendMovies);
  // const trendMovies = useSelector(state => state.movies.trendMovies);
  const location = useLocation();
  const dispatch = useDispatch();

  console.log('movies', movies);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) dispatch(checkToken(token));
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search).get('query');

    if (searchParams !== null) {
      dispatch(searchFilms(searchParams));
    }
  }, [dispatch, location.search]);

  return (
    <Suspense fallback={<DownloadView />}>
      <NavBar />
      <Container>
        <Switch>
          <PublicRoute path="/" exact>
            <HomeView />
          </PublicRoute>
          <PrivateRoute path="/table" redirectTo="/" exact>
            <FilmsTable />
          </PrivateRoute>

          <PublicRoute path="/movies" exact>
            {!data && <EmptyView />}
            {data && (
              <>
                <MoviesView data={movies} />
              </>
            )}
          </PublicRoute>

          <PublicRoute path="/movies/:slug">
            <MovieDetailView />
          </PublicRoute>

          <PublicRoute>
            <NotFoundView />
          </PublicRoute>
        </Switch>
      </Container>
    </Suspense>
  );
};

export default App;
