import { render } from '@testing-library/react';

import ApplicationRequest from './application-request';

describe('ApplicationRequest', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApplicationRequest />);
    expect(baseElement).toBeTruthy();
  });
});
