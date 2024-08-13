import { render } from '@testing-library/react';

import FilterBar from './filter-bar';

describe('FilterBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterBar />);
    expect(baseElement).toBeTruthy();
  });
});
