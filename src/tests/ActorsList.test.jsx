import ActorsList from 'components/ActorsList';

import { castResponse } from './mock/data';
import renderWithRouter from './utils/routeWrapper';

describe('Test ActorsList component', () => {
  it('match snapshot', () => {
    const component = renderWithRouter(<ActorsList dataObj={castResponse} />);
    expect(component).toMatchSnapshot();
  });

  it('render list correctly', () => {
    renderWithRouter(<ActorsList dataObj={castResponse} />);
    const list = document.querySelector('ul');

    expect(list.childElementCount).toBeGreaterThan(0);
  });

  it('render placeholder correctly', () => {
    renderWithRouter(<ActorsList dataObj={castResponse} />);

    const list = document.querySelector('ul');
    const img = list.firstChild.querySelector('img');

    expect(img).toHaveAttribute('alt', ` of ${castResponse.cast[0].name}`);
  });
});
