import { useEffect, useState } from 'react';
import { Filter } from '../filters-component/filters';

export interface FilterBar {
  [key: string]: Filter<unknown>,
}

export interface FilterBarProps<T extends FilterBar = FilterBar> {
  filters: T,
  onSubmit?: (data: T) => void,
}
export function FilterBar<T extends FilterBar>({filters, onSubmit = () => {return}}: FilterBarProps<T>) {
  const [selected, setSelected] = useState(0);
  const [filterActives, setFilterActives] = useState(0);
  const realFC = Object.values(filters).reduce((c, f) => (c + (f.getValue() ? 1 : 0)), 0);
  useEffect(() => setFilterActives(realFC), [realFC]);
  function handleReset() {
    Object.values(filters).forEach(f => f.reset());
    setFilterActives(0);
  }
  return (
    <form className='md:relative' data-testid="filters-form" onSubmit={e => {e.preventDefault();onSubmit(filters)}}>
      <details>
        <summary>Filters {filterActives > 0 && filterActives}</summary>
        <div className='md:absolute md:-bottom-100 md:bg-white md:w-1/3 md:shadow-md md:rounded md:p-3 md:z-10'>
          <div>
            <select className='w-full border rounded-md border-slate-300 p-2' data-testid="filters-list" value={selected} onChange={(el) => setSelected(parseInt(el.target.value))}>
              { Object.entries(filters).map(([name, f], i) => (<option data-testid="filters-list-element" key={i} value={i}>{name}</option>)) }
            </select>
          </div>
          <div>
            {
              Object.entries(filters).map(([name, f], i) => (
                <div data-testid="filters-element" hidden={i !== selected} key={i}>{ f.render() }</div>
              ))
            }
          </div>
          <div className='mt-2 text-center md:text-left'>
            <button type='submit' className='btn btn-primary'>Search</button>
            <button type='button' className='btn btn-secondary ms-2' onClick={() => handleReset()}>Reset</button>
          </div>
        </div>
      </details>
    </form>
  );
}

