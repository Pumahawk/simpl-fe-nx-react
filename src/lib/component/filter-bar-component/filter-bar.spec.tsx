import { fireEvent, render, screen } from '@testing-library/react';

import { FilterBar } from './filter-bar';
import { Filter } from '../filters-component/filters';

describe('FilterBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterBar filters={{}} />);
    expect(baseElement).toBeTruthy();
  });
  it('should display selected element', () => {
    interface SearchFilters extends FilterBar {
      name: Filter<string>;
      email: Filter<string>;
    }
    const filters: SearchFilters = {
      name: {
        getValue: () => "name",
        render: () => <span>Name</span>,
      },
      email: {
        getValue: () => "email",
        render: () => <span>Email</span>,
      },
    }
    render(<FilterBar filters={filters}/>)
    const select = screen.getByTestId("filters-list");
    expect(screen.getAllByTestId("filters-list-element").length).toBe(2);
    const options = screen.getAllByTestId("filters-element");

    expect(options[0].hidden).toBeFalsy();
    expect(options[1].hidden).toBeTruthy();

    fireEvent.change(select, {
      target: {
        value: "0"
      }
    });

    expect(screen.getAllByTestId("filters-list-element").length).toBe(2);
    expect(options[0].hidden).toBeFalsy();
    expect(options[1].hidden).toBeTruthy();

    fireEvent.change(select, {
      target: {
        value: "1"
      }
    });

    expect(screen.getAllByTestId("filters-list-element").length).toBe(2);
    expect(options[0].hidden).toBeTruthy();
    expect(options[1].hidden).toBeFalsy();

  })
  it('should display selected element', () => {
    interface SearchFilters extends FilterBar {
      name: Filter<string>;
      email: Filter<string>;
    }
    const filters: SearchFilters = {
      name: {
        getValue: () => "input name",
        render: () => <span>Name</span>,
      },
      email: {
        getValue: () => "input email",
        render: () => <span>Email</span>,
      },
    }

    const onSubmit = vi.fn();

    render(<FilterBar filters={filters} onSubmit={onSubmit}/>)
    fireEvent.submit(screen.getByTestId("filters-form"));

    const arg = onSubmit.mock.lastCall[0] as SearchFilters;
    expect(arg.name.getValue()).toBe("input name");
    expect(arg.email.getValue()).toBe("input email");
  })
});
