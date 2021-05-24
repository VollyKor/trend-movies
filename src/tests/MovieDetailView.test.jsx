import { render, waitFor } from '@testing-library/react';
import { Route, MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';

import MovieDetailView from 'components/MovieDetailView/MovieDetailView';

import server from 'mocks/server';
import { filmResponse } from './mock/data';

const slug = 'army-of-the-dead-503736';
const rejectedSlug = 'army-of-the-dead-503736123213';

const customWrapper = (ui, { route = '/', slug = '' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Route path="movies/:slug">{ui}</Route>
    </MemoryRouter>,
  );
};

describe('Test MovieDetailView component', () => {
  const route = 'movies/army-of-the-dead-503736';

  it('match snapshot', () => {
    const component = customWrapper(<MovieDetailView />, { route, slug });
    expect(component).toMatchSnapshot();
  });

  it('render loader', async () => {
    const component = customWrapper(<MovieDetailView />, { route, slug });

    await waitFor(async () =>
      expect(await component.findByAltText('logo')).toBeInTheDocument(),
    );
  });

  it('render resolvedPage', async () => {
    server.use(
      rest.get('https://api.themoviedb.org/3/movie/503736', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(filmResponse));
      }),
    );
    const component = customWrapper(<MovieDetailView />, { route, slug });

    await waitFor(async () =>
      expect(await component.findByText(/Go back/i)).toBeInTheDocument(),
    );
  });

  it('render rejectPage', async () => {
    const route = 'movies/army-of-the-dead-503736123213';

    server.use(
      rest.get(
        'https://api.themoviedb.org/3/movie/503736123213',
        (req, res, ctx) => {
          return res(ctx.status(404));
        },
      ),
    );

    const component = customWrapper(<MovieDetailView />, {
      route,
      slug: rejectedSlug,
    });

    await waitFor(async () =>
      expect(
        await component.findByAltText('not found view with funny pinguin'),
      ).toBeInTheDocument(),
    );
  });
});
