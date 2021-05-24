import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import MoviesView from 'components/MoviesView';

import { MoviesViewData } from './mock/data';

describe('Test Component MoviesView', () => {
  it('renders correctle', () => {
    const scr = render(
      <MemoryRouter>
        <MoviesView data={MoviesViewData} />
      </MemoryRouter>,
    );

    expect(scr.container).toContainHTML('<body>');
  });

  it('render correctly', () => {
    const scr = render(
      <MemoryRouter>
        <MoviesView data={MoviesViewData} />
      </MemoryRouter>,
    );

    expect(scr).toMatchSnapshot();
  });
});
