import { screen, fireEvent } from '@testing-library/react';
import renderWithRender from './utils/routeWrapper';

import ReviewItem from 'componentss/ReviewItem/ReviewItem';

import { reviewObj } from './mock/data';

describe('Test ReviewItem Component', () => {
  it('match snapshot', () => {
    const component = renderWithRender(<ReviewItem reviewObj={reviewObj} />);

    expect(component).toMatchSnapshot();
  });

  it('render data correctly', () => {
    renderWithRender(<ReviewItem reviewObj={reviewObj} />);

    const title = document.querySelector('h4');
    const text = document.querySelector('p');

    expect(title).toHaveTextContent(reviewObj.author);
    expect(text).toHaveTextContent(
      `${reviewObj.content.slice(0, 400)}Show more...`,
    );
  });

  it('show full topick after click button', () => {
    renderWithRender(<ReviewItem reviewObj={reviewObj} />);

    const text = document.querySelector('p');
    const showButton = screen.getByText('Show more...');

    fireEvent.click(showButton);
    expect(text).toHaveTextContent(reviewObj.content);
  });

  it('show and hide full topick after click buttons', () => {
    renderWithRender(<ReviewItem reviewObj={reviewObj} />);

    const text = document.querySelector('p');
    const showButton = screen.getByText('Show more...');

    fireEvent.click(showButton);

    const hideButton = screen.getByText('Hide');
    fireEvent.click(hideButton);

    expect(text).toHaveTextContent(
      `${reviewObj.content.slice(0, 400)}Show more...`,
    );
  });
});
