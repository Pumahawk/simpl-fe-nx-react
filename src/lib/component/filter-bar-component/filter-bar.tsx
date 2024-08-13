import { useState } from 'react';
import { Filter } from '../filters-component/filters';

export interface FilterBarProps {
  filters: {
    name: string,
    filter: Filter<unknown>
  }[]
}
export function FilterBar({filters}: FilterBarProps) {
  const [selected, setSelected] = useState(0);
  return (
    <div>
      <div>
        <select value={selected} onChange={(el) => setSelected(parseInt(el.target.value))}>
          { filters.map((f, i) => (<option key={i} value={i}>{f.name}</option>)) }
        </select>
      </div>
      <div>
        {
          filters.map((f, i) => (
            <div hidden={i !== selected} key={i}>{ f.filter.render() }</div>
          ))
        }
      </div>
    </div>
  );
}

