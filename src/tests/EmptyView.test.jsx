import { render } from '@testing-library/react';

import EmptyView from 'components/EmptyView';

import renderWithRender from './utils/routeWrapper';
import emptyListPlaceholder from 'Images/EmptyListPlaceholder.jpg';

describe('Test EmptyView component', () => {
  it('match snapshot', () => {
    const component = render(<EmptyView />);
    expect(component).toMatchSnapshot();
  });

  it('render img placeholderImg', () => {
    renderWithRender(<EmptyView />);

    const href = window.location.href;
    const img = document.querySelector('img');

    expect(img).toHaveProperty('src', `${href}${emptyListPlaceholder}`);
  });
});
