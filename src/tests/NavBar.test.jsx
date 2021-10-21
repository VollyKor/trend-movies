import { screen, fireEvent } from '@testing-library/react';

import NavBar from 'componentss/NavBar/NavBar';

import renderWithRouter from './utils/routeWrapper';

describe('Test Navbar Componnt', () => {
  it('match snapShot', () => {
    const component = renderWithRouter(<NavBar />);
    expect(component).toMatchSnapshot();
  });

  it('links redirect to different pages', () => {
    const homeRoute = '/';
    const moviesRoute = '/movies';

    renderWithRouter(<NavBar />, { route: homeRoute });

    const HomeLink = screen.getByText(/Home/i);
    const MoviesLink = screen.getByText(/Movies/i);

    fireEvent.click(MoviesLink);
    expect(window.location.pathname).toEqual(moviesRoute);

    fireEvent.click(HomeLink);
    expect(window.location.pathname).toEqual(homeRoute);
  });
});
