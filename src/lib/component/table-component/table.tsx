import { ReactNode } from "react";

export type ColumnValues = string | ReactNode;

export interface ColumnDefinition<T> {
    label: string;
    mapper: (row: T) => ColumnValues;
}

export interface TableProps<T> {
    columns: ColumnDefinition<T>[];
    rows: T[];
    rowClick?: (row: T) => void;
}

export function Table<T>({columns, rows, rowClick = () => {return}}: TableProps<T>) {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    { columns.map(col => <td role="rowheader">{col.label}</td>) }
                </tr>
            </thead>
            <tbody role="list">
                { 
                    rows.map((row, i) => (
                        <tr key={i} role="listitem" onClick={() => rowClick(row)}>
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
    onPageChange,
    onSizeChange

}: PaginatedTableProps<T>): ReactNode {
    return (
        <>
            <Table {...{columns, rowClick, rows}} />
            <NavBar {...{options, page, size, onPageChange, onSizeChange}}/>
        </>
    );
}

export interface NavBarProps {
    page: number;
    size: number;
    onPageChange?: (page: number) => void;
    onSizeChange?: (size: number) => void;
    options: number[]
}

export function NavBar({page, size, options, onPageChange = () => {return}, onSizeChange = () => {return}}: NavBarProps) {
    return (
        <div>
            <button data-testid="page-previus" className="btn btn-secondary me-2" onClick={() => onPageChange(page - 1)}>-</button>
            <button data-testid="page-next" className="btn btn-secondary me-2" onClick={() => onPageChange(page + 1)}>+</button>
            <select data-testid="size-box" onChange={(event) => onSizeChange(parseInt(event.target.value))} value={size}>
                { options.map(opt => (<option data-testid="size-option" value={opt}>{opt}</option>)) }
            </select>
        </div>
    )
}