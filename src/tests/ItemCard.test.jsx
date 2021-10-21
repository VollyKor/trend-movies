import empteImgURL from 'Images/imgPlaceholder.png';

import ItemCard from 'componentss/ItemCard/ItemCard';

import renderWithRouter from './utils/routeWrapper';
import { filmResponse } from './mock/data';

describe('Test ItemCard component', () => {
  it('render snapShot correctly', () => {
    const component = renderWithRouter(<ItemCard item={filmResponse} />);

    expect(component).toMatchSnapshot();
  });

  it('render placeholder if img is absent', () => {
    const mockData = { ...filmResponse, backdrop_path: null };
    const component = renderWithRouter(<ItemCard item={mockData} />);

    expect(component.getByAltText(mockData.title)).toHaveAttribute(
      'src',
      empteImgURL,
    );
  });

  it('render title error if title is absent', () => {
    const mockData = { ...filmResponse, title: null };
    const component = renderWithRouter(<ItemCard item={mockData} />);

    expect(component.getByText('Error, title is absent')).toBeInTheDocument();
  });

  it('render title altName if title is absent', () => {
    const mockData = { ...filmResponse, backdrop_path: null, title: null };
    const component = renderWithRouter(<ItemCard item={mockData} />);

    expect(component.getByAltText('Unknown title')).toBeInTheDocument();
  });
});
