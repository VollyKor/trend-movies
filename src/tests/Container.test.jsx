import { screen } from '@testing-library/react';
import renderWithRender from './utils/routeWrapper';

import Container from 'components/Container';

describe('Test Container Component', () => {
  it('render Childrens', () => {
    renderWithRender(
      <Container>
        <p>Example</p>
      </Container>,
    );

    const child = screen.getByText('Example');
    expect(child).toBeInTheDocument();
  });
});
