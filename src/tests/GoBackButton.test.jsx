import { Route, MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';

import GoBackButton from 'components/GoBackButton/GoBackButton';

const customWrapper = (ui, { route = '/', path = '/', state = {} } = {}) => {
  window.history.pushState(state, 'Test page', `/`);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Route path={path}>{ui}</Route>
    </MemoryRouter>,
  );
};

describe('Test GoBackButton', () => {
  it('match snapshot', () => {
    const component = customWrapper(<GoBackButton />);
    expect(component).toMatchSnapshot();
  });

  it('change location state onClick', () => {
    const testSTate = {
      from: 'from/Some/Url',
    };

    const component = customWrapper(<GoBackButton />, {
      state: testSTate,
    });

    fireEvent.click(component.getByText(/Go Back/i));

    expect(window.history.state).toEqual(testSTate);
  });
});
