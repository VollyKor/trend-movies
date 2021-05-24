import { Route, MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import MovieAdditionalInfo from 'components/MovieAdditionalInfo/MovieAdditionalInfo';

import renderWithRouter from './utils/routeWrapper';
import { filmResponse } from './mock/data';

const reviewsPath = 'reviews';
const prodCompaniesPath = 'production-companies`';

const customWrapper = (ui, { route = '/', slug = '', path = '' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Route path={`movies/:slug/${path}`}>{ui}</Route>
    </MemoryRouter>,
    { route, slug },
  );
};

describe('Test MovieAdditionalInfo', () => {
  it('match snapshot', () => {
    const component = customWrapper(
      <MovieAdditionalInfo filmData={filmResponse} />,
    );
    expect(component).toMatchSnapshot();
  });

  //   it('change path on click', () => {});

  //   it('render reviews', () => {
  //     const component = customWrapper(
  //       <MovieAdditionalInfo filmData={filmResponse} />,
  //       { path: reviewsPath },
  //       );

  //       expect(screen.)
  //   });
});
