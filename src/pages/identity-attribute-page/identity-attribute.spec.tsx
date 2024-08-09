import { render } from '@testing-library/react';

import IdentityAttribute from './identity-attribute';

vi.mock("../../lib/auth", () => ({}));
vi.mock("react-router-dom");

describe('IdentityAttribute', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IdentityAttribute />);
    expect(baseElement).toBeTruthy();
  });
});
