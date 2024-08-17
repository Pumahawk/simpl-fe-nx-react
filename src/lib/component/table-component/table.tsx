import { ReactNode, useEffect, useRef } from "react";

export type ColumnValues = string | ReactNode;

export interface ColumnDefinition<T> {
    label: string;
    mapper: (row: T) => ColumnValues;
}

export interface TableProps<T> {
    columns: ColumnDefinition<T>[];
    rows: T[];
    selection?: {
        elements: React.MutableRefObject<T[]>,
        invert?: boolean;
    },
    rowClick?: (row: T) => void;
}

export function Table<T>({columns, rows, selection, rowClick = () => {return}}: TableProps<T>) {
    const selectAllCheckbox = useRef(null);
    const checkbox = useRef(rows.map(row => ({el: row, current: null})));
    useEffect(() => {
        if (selection && selection.invert && selectAllCheckbox.current) {
            (selectAllCheckbox.current as HTMLInputElement).checked = true;
        }
    }, [selection]);
    useEffect(() => updateCheckBoxWithSelected(checkbox, selection), [selection]);
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    {
                        selection && (<td role="rowheader"><input ref={selectAllCheckbox} data-testid="checkbox-all" type="checkbox" onChange={e => {updateAllSelection(rows, selection.elements, selection.invert || false, e.target.checked); updateCheckBoxWithSelected(checkbox, selection);}}/></td>)
                    }
                    { columns.map(col => <td role="rowheader">{col.label}</td>) }
                </tr>
            </thead>
            <tbody role="list">
                { 
                    rows.map((row, i) => (
                        <tr key={i} role="listitem" onClick={() => rowClick(row)}>
                            {
                                selection && checkbox.current && (<td role="rowheader"><input ref={checkbox.current[i]} data-testid="checkbox-item" type="checkbox" data-element={row} onChange={e => updateSelection(selection.elements, selection.invert || false, row, e.target.checked)} onClick={e => e.stopPropagation()}/></td>)
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

function updateAllSelection<T>(rows: T[], elements: React.MutableRefObject<T[]>, invert: boolean, add: boolean) {
    elements.current = (invert ? !add : add) ? rows.concat() : [];
}

function updateSelection<T>(elements: React.MutableRefObject<T[]>, invert: boolean, row: T, add: boolean) {
    elements.current = (invert ? !add : add)
        ? elements.current.concat([row])
        : elements.current.filter(r => r !== row);
}


function updateCheckBoxWithSelected<T>(
    checkbox: React.MutableRefObject<{
            el: T;
            current: null;
        }[]>,
    selection: {
        elements: React.MutableRefObject<T[]>;
        invert?: boolean;
    } | undefined
) {
    checkbox.current?.forEach(ref => {
        if (ref.current) {
            (ref.current as HTMLInputElement).checked = selection?.elements.current.includes(ref.el) ? !selection.invert : !!selection?.invert;
        }
    })
}