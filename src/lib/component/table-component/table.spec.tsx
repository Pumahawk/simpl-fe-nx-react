import { fireEvent, getAllByRole, getByText, render, screen } from '@testing-library/react';

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
  it('should support change page', () => {
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
})