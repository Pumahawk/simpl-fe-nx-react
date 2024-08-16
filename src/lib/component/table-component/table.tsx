import { ReactNode, useCallback, useRef } from "react";

export type ColumnValues = string | ReactNode;

export interface ColumnDefinition<T> {
    label: string;
    mapper: (row: T) => ColumnValues;
}

export interface TableProps<T> {
    columns: ColumnDefinition<T>[];
    rows: T[];
    selection?: React.MutableRefObject<T[]>;
    invertSelection?: boolean;
    rowClick?: (row: T) => void;
}

export function Table<T>({columns, rows, selection, rowClick = () => {return}}: TableProps<T>) {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    {
                        selection && (<td role="rowheader"><input data-testid="checkbox-all" type="checkbox" onChange={e => updateAllSelection(rows, selection, e.target.checked)} /></td>)
                    }
                    { columns.map(col => <td role="rowheader">{col.label}</td>) }
                </tr>
            </thead>
            <tbody role="list">
                { 
                    rows.map((row, i) => (
                        <tr key={i} role="listitem" onClick={() => rowClick(row)}>
                            {
                                selection && (<td role="rowheader"><input data-testid="checkbox-item" type="checkbox" value="true" onChange={e => updateSelection(rows, selection, row, e.target.checked)}/></td>)
                            }
                            { columns.map(col => <td>{col.mapper(row)}</td>) }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export interface PaginatedTableProps<T> extends TableProps<T>, NavBarProps {
};

export function PaginatedTable<T>({

    // Table props
    columns,
    rows,
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
            <Table {...{columns, rowClick, rows}} />
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

function updateAllSelection<T>(rows: T[], selection: React.MutableRefObject<T[]>, add: boolean) {
    selection.current = add ? rows.concat() : [];
}

function updateSelection<T>(rows: T[], selection: React.MutableRefObject<T[]>, row: T, add: boolean) {
    selection.current = add
        ? selection.current.concat([row])
        : selection.current.filter(r => r !== row);
}