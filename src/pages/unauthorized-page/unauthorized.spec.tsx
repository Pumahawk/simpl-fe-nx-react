import { render } from '@testing-library/react';

import Unauthorized from './unauthorized';

describe('Unauthorized', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Unauthorized />);
    expect(baseElement).toBeTruthy();
  });
});
