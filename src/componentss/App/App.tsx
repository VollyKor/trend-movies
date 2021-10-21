import { lazy, Suspense, useEffect } from 'react';
import { Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PrivateRoute from 'componentss/Routes/PrivateRoute';
import PublicRoute from 'componentss/Routes/PublicRoute';
import FavoriteMovies from 'componentss/FavoriteMovies';
import { checkToken } from 'redux/auth/auth.actions';
import { searchFilms } from 'redux/movies/movies.actions';
import './App.css';

import { NotFoundView, DownloadView, EmptyView, Container } from 'componentss';
import { getFavMovies } from 'redux/favoriteMovies/favoriteMovies.actions';
import { getTM } from 'redux/movies/movies.selectors';
import { getIsLoggedIn } from 'redux/auth/auth.selectors';

const Gallery = lazy(
  () =>
    import('componentss/Gallery/Gallery' /* webpackChunkName: 'MoviesView' */),
);
const HomeView = lazy(
  () =>
    import('componentss/HomeView/HomeView' /* webpackChunkName: 'HomeView' */),
);
const MovieDetailView = lazy(
  () =>
    import(
      'componentss/MovieDetailView/MovieDetailView' /* webpackChunkName: 'MovieDetailView' */
    ),
);
const NavBar = lazy(
  () => import('componentss/NavBar/NavBar' /* webpackChunkName: 'NavBar' */),
);

const App = () => {
  const dispatch = useDispatch();
  const movies = useSelector(getTM);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const favMovies = useSelector(getFavMovies);
  const { search: searchQuery } = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) dispatch(checkToken());
  }, [dispatch]);

  useEffect(() => {
    const query = new URLSearchParams(searchQuery).get('query');

    if (query !== null) {
      // @ts-ignore
      dispatch(searchFilms(query));
    }
    if (isLoggedIn && !favMovies) dispatch(getFavMovies());
  }, [dispatch, favMovies, isLoggedIn, searchQuery]);

  return (
    <Suspense fallback={<DownloadView />}>
      <NavBar />
      <Container>
        <Switch>
          <PublicRoute path="/" exact>
            <HomeView />
          </PublicRoute>

          <PrivateRoute path="/favMovies" redirectTo="/" exact>
            <FavoriteMovies />
          </PrivateRoute>

          <PublicRoute path="/movies" exact>
            {movies ? <Gallery /> : <EmptyView />}
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
