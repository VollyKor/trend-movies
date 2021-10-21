import { fireEvent, screen } from '@testing-library/react';

import MovieCard from 'components/MovieCard/MovieCard';

import renderWithRouter from './utils/routeWrapper';
import empteImgURL from 'Images/imgPlaceholder.png';
import { filmResponse } from './mock/data';

describe('Test MovieCard Component', () => {
  it('match snapshot', () => {
    renderWithRouter(<MovieCard data={filmResponse} />);
  });

  it('render Movie poster', () => {
    renderWithRouter(<MovieCard data={filmResponse} />);

    expect(screen.getByAltText(filmResponse.title)).toHaveAttribute(
      'src',
      `https://image.tmdb.org/t/p/w500/${filmResponse.backdrop_path}`,
    );
  });

  it('render placeholder if Movie poster absent', () => {
    const data = { ...filmResponse, backdrop_path: null };

    renderWithRouter(<MovieCard data={data} />);

    expect(screen.getByAltText(data.title)).toHaveAttribute('src', empteImgURL);
  });

  it('render unknown alt if Movie title absent', () => {
    const data = { ...filmResponse, backdrop_path: null, title: null };

    renderWithRouter(<MovieCard data={data} />);

    expect(screen.getByAltText('Unknown')).toHaveAttribute('src', empteImgURL);
  });
});
