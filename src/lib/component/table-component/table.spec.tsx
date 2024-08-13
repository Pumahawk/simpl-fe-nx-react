import { findAllByTestId, fireEvent, getAllByRole, getAllByTestId, getByText, render, screen } from '@testing-library/react';

import { ColumnDefinition, NavBar, PaginatedTable } from './table';

describe('PaginatedTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PaginatedTable columns={[]} rows={[]} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render list', () => {

    const columns: ColumnDefinition<string>[] = [
      {
        label: "COL_LABEL_1",
        mapper: row => `${row}_mapper_1`,
      },
      {
        label: "COL_LABEL_2",
        mapper: row => `${row}_mapper_2`,
      },
    ];

    const rows: string[] = ["value_1", "value_2"];

    render(<PaginatedTable {...{columns, rows}} />);

    const list = screen.getByRole("list");
    expect(list).toBeTruthy();
    const headers = screen.getAllByRole("rowheader");
    expect(getByText(headers[0], "COL_LABEL_1")).toBeTruthy();
    expect(getByText(headers[1], "COL_LABEL_2")).toBeTruthy();

    const rowsRender = getAllByRole(list, "listitem");
    expect(getByText(rowsRender[0], "value_1_mapper_1"));
    expect(getByText(rowsRender[1], "value_2_mapper_2"));
  });
  
  it('should render empy list', () => {
    render(<PaginatedTable columns={[]} rows={[]} />);

    const list = screen.getByRole("list");
    expect(list).toBeTruthy();
  });

});

describe('NavBar', () => {
  it('should render', () => {
    const { baseElement } = render(<NavBar
      page={0}
      size={0}
      options={[]}
    />)
    expect(baseElement).toBeTruthy();
  })
  it('should change page', () => {
    const onPageChange = vi.fn();
    render(<NavBar
      page={2}
      size={10}
      options={[]}
      onPageChange={onPageChange}
    />)
    fireEvent.click(screen.getByTestId('page-next'));
    expect(onPageChange).toBeCalledWith(3);
    fireEvent.click(screen.getByTestId('page-previus'));
    expect(onPageChange).toBeCalledWith(1);

    expect(onPageChange.mock.calls.length).toBe(2);
  })
  it('should select correct size', () => {
    render(<NavBar
      options={[5, 10, 50]}
      size={10}
      page={0}
    />);
    
    const sizeBox = screen.getByTestId('size-box') as HTMLSelectElement;
    expect((sizeBox).value).toBe("10");
    const options = screen.getAllByTestId("size-option") as HTMLOptionElement[];
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
    expect(options[2].selected).toBeFalsy();
  })
  it('should change size', () => {
    const onSizeChange = vi.fn();
    render(<NavBar
      page={2}
      size={10}
      options={[5,10,50]}
      onSizeChange={onSizeChange}
    />)

    const sizeBox = screen.getByTestId('size-box');
    fireEvent.change(sizeBox, {
      target: {
        value: "5"
      }
    });
    expect(onSizeChange).toBeCalledWith(5);
  })
})