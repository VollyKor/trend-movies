import { waitFor, fireEvent, render } from '@testing-library/react';
import { rest } from 'msw';

import HomeView from 'componentss/HomeView/HomeView';

import NotFoundImg from 'Images/404_page_cover.jpg';
import renderWithRouter from './utils/routeWrapper';
import server from 'mocks/server';
import { dataObj } from './mock/data';

describe('Test HomeView component', () => {
  it('render snapShot', async () => {
    server.use(
      rest.get(
        'https://api.themoviedb.org/3/trending/movie/day',
        (req, res, ctx) => res(ctx.status(200), ctx.json(dataObj)),
      ),
    );

    const { findAllByText } = renderWithRouter(<HomeView />);

    expect(await findAllByText('Previous')).toMatchSnapshot();
  });

  it('changed page on click', async () => {
    let currentPage = '1';

    server.use(
      rest.get(
        'https://api.themoviedb.org/3/trending/movie/day',
        (req, res, ctx) => {
          currentPage = req.url.searchParams.get('page');
          return res(ctx.status(200), ctx.json(dataObj));
        },
      ),
    );

    const { findByText } = renderWithRouter(<HomeView />);
    fireEvent.click(await findByText('Next'));

    await waitFor(() => {
      expect(currentPage).toEqual('2');
    });
  });

  it('handle rejected request', async () => {
    server.use(
      rest.get(
        'https://api.themoviedb.org/3/trending/movie/day',
        (req, res, ctx) => res(ctx.status(404)),
      ),
    );

    const { findByAltText } = renderWithRouter(<HomeView />);

    expect(
      await findByAltText('not found view with funny pinguin'),
    ).toHaveAttribute('src', NotFoundImg);
  });

  it('handle empty result obj', async () => {
    const mockData = { ...dataObj, results: [] };
    server.use(
      rest.get(
        'https://api.themoviedb.org/3/trending/movie/day',
        (req, res, ctx) => res(ctx.json(mockData)),
      ),
    );

    const { findByAltText } = renderWithRouter(<HomeView />);

    expect(
      await findByAltText('not found view with funny pinguin'),
    ).toHaveAttribute('src', NotFoundImg);
  });
});
