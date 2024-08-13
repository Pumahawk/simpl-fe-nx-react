import { render } from '@testing-library/react';

import HomePage from './home';

vi.mock('react-router-dom');

describe('Home', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomePage />);
    expect(baseElement).toBeTruthy();
  });
});
