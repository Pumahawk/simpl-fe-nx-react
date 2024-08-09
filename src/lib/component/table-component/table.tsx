import { ReactNode } from "react";

export type ColumnValues = string | ReactNode;

export interface ColumnDefinition<T> {
    label: string;
    mapper: (row: T) => ColumnValues;
}

export interface PaginatedTableProps<T> {
    columns: ColumnDefinition<T>[];
    rows: T[];
    role?: string;
    rowClick: (row: T) => void
};

export function PaginatedTable<T>({columns, rowClick, rows, role = "content"}: PaginatedTableProps<T>): ReactNode {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    { columns.map(col => <td>{col.label}</td>) }
                </tr>
            </thead>
            <tbody role={role}>
                { 
                    rows.map((row, i) => (
                        <tr key={i} onClick={() => rowClick(row)}>
                            { columns.map(col => <td>{col.mapper(row)}</td>) }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export interface NavBarProps {
    page: number;
    size: number;
    onPageChange: (page: number) => void;
    onSizeChange: (size: number) => void;
    options: number[]
}

export function NavBar({page, size, options, onPageChange, onSizeChange}: NavBarProps) {
    return (
        <div>
            <button className="btn btn-secondary me-2" onClick={() => onPageChange(page - 1)}>-</button>
            <button className="btn btn-secondary me-2" onClick={() => onPageChange(page + 1)}>+</button>
            <select onChange={(event) => onSizeChange(parseInt(event.target.value))} value={size}>
                { options.map(opt => (<option value={opt}>{opt}</option>)) }
            </select>
        </div>
    )
}