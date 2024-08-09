import { render } from '@testing-library/react';

import IdentityAttributeDetails from './identity-attribute-details';

describe('IdentityAttributeDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IdentityAttributeDetails />);
    expect(baseElement).toBeTruthy();
  });
});
