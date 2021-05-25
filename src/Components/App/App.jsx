import './App.css';
import { lazy, useState, Suspense, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import {
  NotFoundView,
  DownloadView,
  EmptyView,
  Container,
  FilmsTable,
} from 'components';

import request from 'service/apiRequest';

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
    <Suspense fallback={<DownloadView />}>
      <NavBar />
      <Container>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>
          <Route path="/table" exact>
            <FilmsTable />
          </Route>

          <Route path="/movies" exact>
            {!data && <EmptyView />}
            {data && (
              <>
                <MoviesView data={data} />
              </>
            )}
          </Route>

          <Route path="/movies/:slug">
            <MovieDetailView />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Container>
    </Suspense>
  );
};

export default App;
