import { fireEvent, getAllByRole, getByText, render, screen } from '@testing-library/react';

import { ColumnDefinition, NavBar, Table } from './table';

describe('Table', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Table getRowId={() => 0} columns={[]} rows={[]} />);
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

    render(<Table {...{columns, rows}} getRowId={r => r} />);

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
    render(<Table columns={[]} rows={[]} getRowId={() => 0} />);

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
  it('should render correct size', () => {
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
  it('should diable previus button', () => {
    const onSizeChange = vi.fn();
    render(<NavBar
      page={0}
      size={10}
      options={[5,10,50]}
      onPageChange={onSizeChange}
    />)
    fireEvent.click(screen.getByTestId('page-previus'));
    expect(onSizeChange).toBeCalledTimes(0);
  })
  it('should diable next button', () => {
    const onSizeChange = vi.fn();
    render(<NavBar
      page={0}
      size={10}
      options={[5,10,50]}
      totalPages={1}
      onPageChange={onSizeChange}
    />)
    fireEvent.click(screen.getByTestId('page-next'));
    expect(onSizeChange).toBeCalledTimes(0);
  })
  it('should show checkbox', () => {
    render(<Table
      columns={[]}
      selection={{elements: []}}
      rows={[{value: "v1"}]}
      getRowId={r => r.value}
    />);
    screen.getByTestId("checkbox-all");
    screen.getByTestId("checkbox-item");
  })
  it('should check select all property', () => {
    render(<Table
      columns={[]}
      rows={[]}
      selection={{elements: [], selectAll: true}}
      getRowId={() => 0}
    />)
    const selectAll = (screen.getByTestId("checkbox-all")) as HTMLInputElement;
    expect(selectAll.checked).toBe(true);
  })
  it('should select and deselect some row', () => {
    const onSelectRow = vi.fn();
    render(<Table
      columns={[]}
      rows={["A", "B", "C", "D"]}
      getRowId={r => r} 
      selection={{elements: [], onSelectRow}}
    />)
    const items = screen.getAllByTestId("checkbox-item");
    fireEvent.click(items[1]);
    expect(onSelectRow).lastCalledWith("B", true);
    fireEvent.click(items[3]);
    expect(onSelectRow).lastCalledWith("D", true);
  })
  it('should select and deselect all rows', () => {
    const onSelectAll = vi.fn();
    render(<Table
      columns={[]}
      rows={["A", "B", "C", "D"]}
      getRowId={r => r} 
      selection={{elements: ["B"], onSelectAll}}
    />)
    fireEvent.click(screen.getByTestId("checkbox-all"));
    expect(onSelectAll).lastCalledWith(true);
  })
  it('should not fire rowClick on checkbox', () => {
    const rowClick = vi.fn();
    render(<Table
      columns={[]}
      rows={["A", "B", "C", "D"]}
      getRowId={r => r} 
      selection={{elements: []}}
      rowClick={rowClick}
    />)
    fireEvent.click(screen.getAllByTestId("checkbox-item")[1]);
    fireEvent.click(screen.getByTestId("checkbox-all"));
    expect(rowClick).toBeCalledTimes(0);
  })
  it('should select box on render', () => {
    render(<Table
      columns={[]}
      rows={["A", "B", "C", "D"]}
      getRowId={r => r} 
      selection={{elements: ["B"]}}
    />)
    const items = screen.getAllByTestId("checkbox-item") as HTMLInputElement[];
    expect(items[1].checked).toBe(true);
  })
  it('should respect invert property on render', () => {
    render(<Table
      columns={[]}
      rows={["A", "B", "C", "D"]}
      getRowId={r => r} 
      selection={{elements: ["B"], selectAll: true, invert: true}}
    />)
    const selectAll = (screen.getByTestId("checkbox-all")) as HTMLInputElement;
    expect(selectAll.checked).toBe(true);
    const items = screen.getAllByTestId("checkbox-item") as HTMLInputElement[];
    expect(items.filter(item => item.checked).map(el => el.dataset.element)).toStrictEqual(["A", "C", "D"]);
  })
})