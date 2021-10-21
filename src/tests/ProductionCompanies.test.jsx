import ProductionCompanies from 'components/ProductionCompanies/ProductionCompanies';

import renderWithRouter from './utils/routeWrapper';
import { productionCompanies } from './mock/data';
import logoPlaceholder from 'Images/LogoPlaceholder.png';

describe('Test component Production Companies', () => {
  it('match snapShot', () => {
    const component = renderWithRouter(
      <ProductionCompanies dataArray={productionCompanies} />,
    );

    expect(component).toMatchSnapshot();
  });

  it('render list correctly', () => {
    renderWithRouter(<ProductionCompanies dataArray={productionCompanies} />);

    const listLength = productionCompanies.length;
    const list = document.querySelector('ul');
    expect(list.children).toHaveLength(listLength);
  });

  it('render placeholder for absent images', () => {
    renderWithRouter(<ProductionCompanies dataArray={productionCompanies} />);

    const href = window.location.href;
    const list = document.querySelector('ul');

    productionCompanies.forEach((e, i) => {
      if (e.logo_path) return;

      const item = list.childNodes[i];
      const img = item.querySelector('img');

      expect(img.src).toEqual(`${href}${logoPlaceholder}`);
    });
  });
});
