import { useState } from 'react';
import { Filter } from '../filters-component/filters';

export interface FilterBar {
  [key: string]: Filter<unknown>,
}

export interface FilterBarProps<T extends FilterBar> {
  filters: T,
  onSubmit?: (data: T) => void,
}
export function FilterBar<T extends FilterBar>({filters, onSubmit = () => {return}}: FilterBarProps<T>) {
  const [selected, setSelected] = useState(-1);
  return (
    <form data-testid="filters-form" onSubmit={e => {e.preventDefault();onSubmit(filters)}}>
      <div>
        <select data-testid="filters-list" value={selected} onChange={(el) => setSelected(parseInt(el.target.value))}>
          { selected === -1  && <option data-testid="filters-list-element" value="-1">None</option> }
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
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
}

