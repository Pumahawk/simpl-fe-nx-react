import { findByTestId, fireEvent, render, screen, waitFor } from '@testing-library/react';

import {FetchArgs, TableSearchRest} from './table-search-rest';
import { FilterBar, FilterBarProps } from '../filter-bar-component/filter-bar';
import { Filter } from '../filters-component/filters';
import { PagedModel } from 'src/lib/resource-framework/simpl-client';
import { PaginatedTable } from '../table-component/table';

vi.mock('../table-component/table');
vi.mock('../filter-bar-component/filter-bar');

describe('TableSearchRest', () => {
  beforeAll(() => {
    vi.resetAllMocks();
  })
  it('should render successfully', async () => {
    const { baseElement } = render(
      <TableSearchRest
        filterBar={{filters: {}}}
        initSize={10}
        paginatedTable={{
          getRowId: () => "",
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

  it('should show filters before data', () => {
    const FilterBarMock = vi.mocked(FilterBar);
    FilterBarMock.mockImplementation(() => {
      return <div data-testid="filters-form">filters</div>
    })
    render(
      <TableSearchRest
        filterBar={{filters: {}}}
        initSize={10}
        paginatedTable={{
          getRowId: () => "",
          columns: [],
          options: [10],
        }}
        search={() => new Promise<PagedModel<unknown>>(() => {return})}
      />
    );
    const form = screen.getByTestId("filters-form");
    expect(form).toBeTruthy();
  })

  it('should support type search', async () => {
    vi.mocked(FilterBar).mockImplementation(arg => <MockFilterBar {...{...arg, onSubmitArg: {
      name: {
        getValue: () => "my name",
        render: () => <span>filter name</span>,
        reset: () => {return},
      },
      age: {
        getValue: () => 10,
        render: () => <span>filter age</span>,
        reset: () => {return},
      }
    }}}/>)
    vi.mocked(PaginatedTable).mockReturnValue(<div>MockPaginatedTable</div>);
    interface UserInfo {
      name: string;
      age: number;
    }
    interface UserForm extends FilterBar {
      name: Filter<string>;
      age: Filter<number>;
    }
    const searchFn = vi.fn((arg => Promise.resolve({
      content: [
        { name: "user-1", age: 10 },
        { name: "user-2", age: 20 },
      ],
      page: {
        number: arg.page,
        size: arg.size,
        totalElements: 15,
        totalPages: 2,
      }
    })));
    render(<TableSearchRest<UserInfo, UserForm>
      filterBar={{
        filters: {
          name: {
            getValue: () => "my name",
            render: () => <span>filter name</span>,
            reset: () => {return},
          },
          age: {
            getValue: () => 10,
            render: () => <span>filter age</span>,
            reset: () => {return},
          }
        }
      }}
      paginatedTable={{
        getRowId: () => "",
        columns: [
          {
            label: "Name",
            mapper: row => <label>{row.name}</label>
          },
          {
            label: "Age",
            mapper: row => <label>{String(row.age)}</label>
          }
        ],
        options: [5,10,50],
      }}
      initSize={10}
      search={searchFn}
    />)
    expect(searchFn).toBeCalledTimes(1);
    await screen.findByTestId("table-search-rest");

    fireEvent.submit(screen.getByTestId("filters-form"));
    await waitFor(() => expect(searchFn).toBeCalledTimes(2));

    const el = searchFn.mock.calls[1][0] as FetchArgs<UserForm>;
    expect(el.filters?.name.getValue()).toBe("my name")
    expect(el.filters?.age.getValue()).toBe(10)

    vi.mocked(PaginatedTable).mock.lastCall![0].onPageChange!(1);
    await waitFor(() => expect(searchFn).toBeCalledTimes(3));
    
    const el2 = searchFn.mock.calls[2][0] as FetchArgs<UserForm>;
    expect(el2.page).toBe(1);

    vi.mocked(PaginatedTable).mock.lastCall![0].onSizeChange!(50);
    await waitFor(() => expect(searchFn).toBeCalledTimes(4));
    const el3 = searchFn.mock.calls[3][0] as FetchArgs<UserForm>;
    expect(el3.size).toBe(50);
    expect(el3.page).toBe(0);
  })
});


function MockFilterBar<T extends FilterBar = FilterBar>({onSubmit, onSubmitArg}:(FilterBarProps<T> & {onSubmitArg: T})) {
  return (
    <form data-testid="filters-form" onSubmit={() => onSubmit && onSubmit(onSubmitArg)}>
    </form>
  );
}
