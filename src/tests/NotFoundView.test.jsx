import { screen } from '@testing-library/react';

import NotFoundView from 'components/NotFoundView/NotFoundView';

import renderWithRouter from './utils/routeWrapper';

describe('test NotFoundViewComponent', () => {
  it('match snapShot', async () => {
    const component = renderWithRouter(<NotFoundView />);
    expect(component).toMatchSnapshot();
  });

  it('render placeholder img', async () => {
    renderWithRouter(<NotFoundView />);

    const img = await screen.findByAltText('not found view with funny pinguin');
    expect(img).toBeInTheDocument();
  });
});
