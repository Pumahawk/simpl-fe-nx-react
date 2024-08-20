import { ReactNode } from "react";

export type ColumnValues = string | ReactNode;

export interface ColumnDefinition<T> {
    label: string;
    mapper: (row: T) => ColumnValues;
}

export interface TableProps<T> {
    columns: ColumnDefinition<T>[];
    rows: T[];
    getRowId: (element: T) => string | number;
    selection?: {
        elements: T[]
        invert?: boolean;
        selectAll?: boolean
        onSelectAll?: (checked: boolean) => void;
        onSelectRow?: (row: T, checked: boolean) => void;
    },
    rowClick?: (row: T) => void;
}

export function Table<T>({columns, rows, getRowId, selection, rowClick = () => {return}}: TableProps<T>) {
    function checkedRow(row: T): boolean {
        if (selection) {
            const include = selection.elements.includes(row);
            return selection.invert ? !include : include;
        } else {
            return false;
        }
    }
    return (
        <div className="overflow-x-auto">
            <table className="table-auto text-nowrap">
                <thead>
                    <tr>
                        {
                            selection && (<td role="rowheader"><input data-testid="checkbox-all" type="checkbox" checked={selection.selectAll} onChange={e => selection.onSelectAll && selection.onSelectAll(e.target.checked)}/></td>)
                        }
                        { columns.map(col => <td role="rowheader" key={col.label}>{col.label}</td>) }
                    </tr>
                </thead>
                <tbody role="list">
                    { 
                        rows.map((row, i) => (
                            <tr key={getRowId(row)} role="listitem" onClick={() => rowClick(row)}>
                                {
                                    selection && (<td role="rowheader"><input data-testid="checkbox-item" type="checkbox" data-element={row} checked={checkedRow(row)} onChange={e => selection.onSelectRow && selection.onSelectRow(row, e.target.checked)} onClick={e => e.stopPropagation()}/></td>)
                                }
                                { columns.map(col => <td>{col.mapper(row)}</td>) }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export interface PaginatedTableProps<T> extends TableProps<T>, NavBarProps {
};

export function PaginatedTable<T>({

    // Table props
    columns,
    rows,
    getRowId,
    rowClick = () => {return},

    // NavBar props
    options,
    page,
    size,
    totalPages,
    onPageChange,
    onSizeChange

}: PaginatedTableProps<T>): ReactNode {
    return (
        <>
            <div className="mb-4">
                <Table {...{columns, rowClick, rows, getRowId}} />
            </div>
            <NavBar {...{options, page, size, onPageChange, onSizeChange, totalPages}}/>
        </>
    );
}

export interface NavBarProps {
    page: number;
    size: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
    onSizeChange?: (size: number) => void;
    options: number[]
}

export function NavBar({page, totalPages, size, options, onPageChange = () => {return}, onSizeChange = () => {return}}: NavBarProps) {
    return (
        <div>
            <button disabled={page - 1 < 0} data-testid="page-previus" className="btn btn-secondary me-2" onClick={() => onPageChange(page - 1)}>-</button>
            <button disabled={totalPages ? page + 1 >= totalPages : false} data-testid="page-next" className="btn btn-secondary me-2" onClick={() => onPageChange(page + 1)}>+</button>
            <select data-testid="size-box" onChange={(event) => onSizeChange(parseInt(event.target.value))} value={size}>
                { options.map(opt => (<option data-testid="size-option" value={opt}>{opt}</option>)) }
            </select>
        </div>
    )
}
