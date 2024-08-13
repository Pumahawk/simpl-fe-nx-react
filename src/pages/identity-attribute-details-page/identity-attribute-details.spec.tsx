import { render } from '@testing-library/react';

import IdentityAttributeDetails from './identity-attribute-details';

import { useLoaderData } from 'react-router-dom';

vi.mock('react-router-dom');

describe('IdentityAttributeDetails', () => {
  it('should render successfully', () => {
    vi.mocked(useLoaderData).mockReturnValue({
      deferred: {}
    })
    const { baseElement } = render(<IdentityAttributeDetails />);
    expect(baseElement).toBeTruthy();
  });
});
