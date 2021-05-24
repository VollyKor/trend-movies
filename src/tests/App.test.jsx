import { Route, MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Suspense } from 'react';
import { rest } from 'msw';

import App from 'components/App/App';
import DownloadView from 'components/DownloadView/DownloadView';

import { filmResponse, MoviesViewData } from './mock/data';
import server from 'mocks/server';

const customWrapper = (ui, { route = '/', path = '/' } = {}) => {
  window.history.pushState({}, 'Test page', `/`);

  return render(
    <Suspense fallback={<DownloadView />}>
      <MemoryRouter initialEntries={[route]}>
        <Route path={path}>{ui}</Route>
      </MemoryRouter>
    </Suspense>,
  );
};

describe('Test App component', () => {
  it('match snapshot', async () => {
    const component = customWrapper(<App />);

    await screen.findByText('Home');
    expect(component).toMatchSnapshot();
  });

  it('test MoviesView render', async () => {
    const { findByAltText } = customWrapper(<App />, { route: '/movies' });

    expect(await findByAltText('emptyListPlaceholder')).toBeInTheDocument();
  });

  it('test MoviesView with data render', async () => {
    server.use(
      rest.get('https://api.themoviedb.org/3/movie/503736', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(filmResponse)),
      ),
    );

    const { findByAltText } = customWrapper(<App data={filmResponse} />, {
      route: '/movies/army-of-the-dead-503736',
    });

    expect(await findByAltText(filmResponse.title)).toBeInTheDocument();
  });

  it('test MoviesView with search data render', async () => {
    server.use(
      rest.get('https://api.themoviedb.org/3/search/movie', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(MoviesViewData));
      }),
    );

    const { findByText } = customWrapper(<App data={MoviesViewData} />, {
      route: '/movies?query=army',
    });

    expect(await findByText('Shrek')).toBeInTheDocument();
  });
});
