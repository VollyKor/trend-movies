import React from 'react';
import { Route, MemoryRouter } from 'react-router-dom';
import { act, render, waitFor } from '@testing-library/react';

import { rest } from 'msw';
import server from 'mocks/server';

import MovieAdditionalInfo from '../componentss/MovieAdditionalInfo/MovieAdditionalInfo';

import { filmResponse } from './mock/data';

const reviewsPath = 'reviews';
const slug = 'army-of-the-dead-503736';

const customWrapper = (ui, { route = '/', slug = '', path = '' } = {}) => {
  window.history.pushState({}, 'Test page', `/movies/${slug}/${path}`);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Route path={`/movies/${slug}/${path}`}>{ui}</Route>
    </MemoryRouter>,
  );
};

describe('Test MovieAdditionalInfo', () => {
  it('match snapshot', async () => {
    const container = document.createElement('div');
    await act(async () => {
      const component = render(
        <MemoryRouter initialEntries={[`/users/${slug}`]}>
          <Route path="/movies/:slug">
            <MovieAdditionalInfo filmData={filmResponse} />
          </Route>
        </MemoryRouter>,
        container,
      );

      expect(component).toMatchSnapshot();
    });
  });

  it('render reviews', async () => {
    server.use(
      rest.get(
        'https://api.themoviedb.org/3/search/movie/503736/reviews',
        (req, res, ctx) => res(ctx.status(200), ctx.json(filmResponse)),
      ),
    );

    const component = customWrapper(
      <MovieAdditionalInfo filmData={filmResponse} />,
      { path: reviewsPath, slug },
    );

    await waitFor(() => component);
    console.log(component.container.childNodes.length);
    expect(component).toMatchSnapshot();
  });
});
