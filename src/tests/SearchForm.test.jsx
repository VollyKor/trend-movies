import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './utils/routeWrapper';

import SearchForm from 'componentss/SearchForm/SearchForm';

describe('Test search Form Component', () => {
  it('render snapshot', () => {
    const component = renderWithRouter(<SearchForm />);
    expect(component).toMatchSnapshot();
  });

  it('show value in form', () => {
    renderWithRouter(<SearchForm />);

    const input = screen.getByPlaceholderText('write something');
    fireEvent.change(input, { target: { value: '23' } });

    expect(input).toHaveDisplayValue('23');
  });

  it('add search query to pathname', () => {
    const query = 'Shrek';
    renderWithRouter(<SearchForm />);

    const input = screen.getByPlaceholderText('write something');
    const button = document.querySelector('button[type=submit]');

    fireEvent.change(input, { target: { value: query } });
    fireEvent.click(button);

    expect(window.location.search).toEqual(`?query=${query}`);
  });

  it('doesnt search anything if form field empty', () => {
    renderWithRouter(<SearchForm />);

    const input = screen.getByPlaceholderText('write something');
    const button = document.querySelector('button[type=submit]');

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);

    expect(window.location.search).toEqual(``);
  });
});
