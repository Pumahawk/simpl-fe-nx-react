import { ReactNode } from "react";

export type ColumnValues = string | ReactNode;

export interface ColumnDefinition<T> {
    label: string;
    mapper: (row: T) => ColumnValues;
}

export interface PaginatedTableProps<T> {
    columns: ColumnDefinition<T>[];
    rows: T[];
    rowClick: (row: T) => void
};

export function PaginatedTable<T>({columns, rowClick, rows}: PaginatedTableProps<T>): ReactNode {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    { columns.map(col => <td>{col.label}</td>) }
                </tr>
            </thead>
            <tbody>
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