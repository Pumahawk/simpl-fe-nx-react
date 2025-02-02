import { usePromiseComponent } from '../..//custom-react';
import { PagedModel } from '../../resource-framework/simpl-client';
import { FilterBar} from '../filter-bar-component/filter-bar';
import { ColumnDefinition, PaginatedTable } from '../table-component/table';
import React, { Suspense, useState } from 'react';

export interface FetchArgs<F extends FilterBar = FilterBar> {
  page: number;
  size: number;
  filters?: F;
}

export interface FilterBarConfig<T extends FilterBar> {
  filters: T,
}

export interface PaginatedTableConfig<T> {
  options: number[]
  columns: ColumnDefinition<T>[];
  getRowId: (row: T) => string | number;
  rowClick?: (row: T) => void;
};

export type SearchAPIType<DataType, FilterType extends FilterBar> = (arg: FetchArgs<FilterType>) => Promise<PagedModel<DataType>>;

export interface TableSearchRestProp<DataType, FilterType extends FilterBar>  {
  fallback?: React.ReactNode;
  search: SearchAPIType<DataType, FilterType>;
  initSize: number;
  filterBar?: FilterBarConfig<FilterType>;
  paginatedTable: PaginatedTableConfig<DataType>;
}

export function TableSearchRest<DataType, FilterType extends FilterBar>({search, fallback, filterBar, paginatedTable, initSize}: TableSearchRestProp<DataType, FilterType>) {
  const [size, setSize] = useState(initSize);
  const [searchAPI, setSearchAPI] = useState<() => Promise<PagedModel<DataType>>>(() => () => search({
    filters: filterBar?.filters,
    page: 0,
    size: initSize,
  }));
  const Render = usePromiseComponent(searchAPI, dataset => {
    setSize(dataset.page.size);
    return (
      <div className={paginatedTable.rowClick ? "table-action" : ""} data-testid="table-search-rest">
        <PaginatedTable
          {...paginatedTable}
          page={dataset.page.number}
          size={dataset.page.size}
          rows={dataset.content}
          totalPages={dataset.page.totalPages}
          onPageChange={page => setSearchAPI(() => () => search({
            filters: filterBar?.filters,
            page,
            size: dataset.page.size,
          }))}
          onSizeChange={size => setSearchAPI(() => () => search({
            filters: filterBar?.filters,
            page: 0,
            size,
          }))}
        />
      </div>
    )
  }, [searchAPI]);

  return (
    <div>
      {
        filterBar && 
        <div className='mb-3'>
          <FilterBar {...filterBar} onSubmit={(filters) => setSearchAPI(() => () => search({
            filters: filters,
            page: 0,
            size,
          }))}/>
        </div>
      }
      <Suspense fallback={fallback}>
        <Render/>
      </Suspense>
    </div>
  )
  
}
