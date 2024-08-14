import { render } from '@testing-library/react';

import TableSearchRest from './table-search-rest';

describe('TableSearchRest', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableSearchRest />);
    expect(baseElement).toBeTruthy();
  });
});
