import { useState } from 'react';
import { Filter } from '../filters-component/filters';

export interface FilterBar {
  [key: string]: Filter<unknown>,
}

export interface FilterBarProps<T extends FilterBar> {
  filters: T
}
export function FilterBar<T extends FilterBar>({filters}: FilterBarProps<T>) {
  const [selected, setSelected] = useState(-1);
  return (
    <div>
      <div>
        <select data-testid="filters-list" value={selected} onChange={(el) => setSelected(parseInt(el.target.value))}>
          <option value="-1">None</option>
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
    </div>
  );
}

