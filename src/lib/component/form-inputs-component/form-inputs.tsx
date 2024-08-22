import { HTMLProps } from 'react';
import styles from './form-inputs.module.scss';

export interface InputProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  input?: HTMLProps<HTMLInputElement>;
}
export function Input({label, id, name, input, type="text"}: InputProps) {
  return (
    <div className='relative mt-5'>
      <input className='peer w-full border outline-0 pt-3 pb-4 px-3 border rounded-md focus:outline-1 focus:outline-primary-800 ' type={type} id={id} name={name} {...input}></input>
      <label className='absolute -top-2.5 left-2 bg-white px-3 text-xs rounded-md text-slate-500 peer-focus:text-primary-800 peer-focus:font-semibold' htmlFor={id}>{label}</label>
    </div>
  );
}

export interface SelectProps {
  id: string;
  label: string;
  name: string;
  options: {
    label: string;
    id: string;
    value: string;
  }[],
  select?: HTMLProps<HTMLSelectElement>
}
export function Select({id, label, select, options}: SelectProps) {
  return (
    <div className='relative mt-5'>
    <select {...select} className='peer w-full border outline-0 pt-3 pb-4 px-3 border rounded-md focus:outline-1 focus:outline-primary-800'>
      { options.map(option => <option key={option.id} value={option.value}>{option.label}</option>) }
    </select>
    <label className='absolute -top-2.5 left-2 bg-white px-3 text-xs rounded-md text-slate-500 peer-focus:text-primary-800 peer-focus:font-semibold' htmlFor={id}>{label}</label>
    </div>
  );
}
