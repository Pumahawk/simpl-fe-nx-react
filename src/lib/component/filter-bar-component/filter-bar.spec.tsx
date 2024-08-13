import { fireEvent, render, screen } from '@testing-library/react';

import { FilterBar } from './filter-bar';
import { TextFilter } from '../filters-component/filters';

describe('FilterBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterBar filters={{}} />);
    expect(baseElement).toBeTruthy();
  });
  it('should display selected element', () => {
    interface SearchFilters extends FilterBar {
      name: TextFilter;
      email: TextFilter;

    }
    const filters: SearchFilters = {
      name: new TextFilter({
        label: "name",
        name: "name",
      }),
      email: new TextFilter({
        label: "email",
        name: "email",
      }),
    }
    render(<FilterBar filters={filters}/>)
    const select = screen.getByTestId("filters-list");
    const options = screen.getAllByTestId("filters-element");

    expect(options[0].hidden).toBeTruthy();
    expect(options[1].hidden).toBeTruthy();

    fireEvent.change(select, {
      target: {
        value: "0"
      }
    });

    expect(options[0].hidden).toBeFalsy();
    expect(options[1].hidden).toBeTruthy();

    fireEvent.change(select, {
      target: {
        value: "1"
      }
    });

    expect(options[0].hidden).toBeTruthy();
    expect(options[1].hidden).toBeFalsy();

  })
});
