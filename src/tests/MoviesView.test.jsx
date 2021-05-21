import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import MoviesView from 'components/MoviesView';

import { MoviesViewData } from './mock/data';

describe('Test Component MoviesView', () => {
  test('it renders', () => {
    const scr = render(
      <MemoryRouter>
        <MoviesView data={MoviesViewData} />
      </MemoryRouter>,
    );

    expect(scr.container).toContainHTML('<body>');
  });
});
