import { render } from '@testing-library/react';

import IdentityAttribute from './identity-attribute';

describe('IdentityAttribute', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IdentityAttribute />);
    expect(baseElement).toBeTruthy();
  });
});
