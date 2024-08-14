import { findByTestId, render } from '@testing-library/react';

import {TableSearchRest} from './table-search-rest';

describe('TableSearchRest', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(
      <TableSearchRest
        filterBar={{filters: {}}}
        initSize={10}
        paginatedTable={{
          columns: [],
          options: [10],
        }}
        search={() => Promise.resolve({
          content: [],
          page: {
            number: 0,
            size: 0,
            totalElements: 0,
            totalPages: 0,
          }
        })}
      />
    );
    expect(baseElement).toBeTruthy();
    const table = await findByTestId(baseElement, "table-search-rest");
    expect(table).toBeTruthy();
  });
});
