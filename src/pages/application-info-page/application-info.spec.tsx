import { render } from '@testing-library/react';

import ApplicationInfo from './application-info';

describe('ApplicationInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApplicationInfo />);
    expect(baseElement).toBeTruthy();
  });
});
