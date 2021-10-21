import renderWithRouter from './utils/routeWrapper';

import Review from 'componentss/Review/Review';

import { dataObj, emptyDataObj } from './mock/data';

describe('Test Review Component', () => {
  it('match snapShot', () => {
    renderWithRouter(<Review dataObj={dataObj} />);
  });

  it('render list correctly', () => {
    renderWithRouter(<Review dataObj={dataObj} />);

    const listLength = dataObj.results.length;
    const list = document.querySelector('ul');

    expect(list.children).toHaveLength(listLength);
  });

  it('render empty list if list empty', () => {
    renderWithRouter(<Review dataObj={emptyDataObj} />);

    const img = document.querySelector('img');

    expect(img).toHaveAttribute('alt', 'emptyListPlaceholder');
  });
});
