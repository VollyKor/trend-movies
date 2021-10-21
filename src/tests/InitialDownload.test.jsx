import logo from 'Images/logo.svg';

import InitialDownload from 'components/InitialDownload/InitialDownload';

import renderWithRouter from './utils/routeWrapper';

describe('Test InitialDowwnload component', () => {
  it('render snapShot', () => {
    const component = renderWithRouter(<InitialDownload />);

    expect(component).toMatchSnapshot();
  });

  it('render download logo img', () => {
    const component = renderWithRouter(<InitialDownload />);
    expect(component.getByAltText('logo')).toHaveAttribute('src', logo);
  });
});
