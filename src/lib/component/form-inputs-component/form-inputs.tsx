import React, { forwardRef, HTMLProps, useEffect, useImperativeHandle, useRef } from 'react';

export interface InputLayoutProps {
  id: string;
  label: string;
  invalidMessage?: string | undefined | null;
  children: (className: string) => React.ReactNode;
}
export function InputLayout({id, label, children, invalidMessage}: InputLayoutProps) {
  return (
    <div className='relative mt-5'>
      {children('peer w-full border pt-3 pb-4 px-3 rounded-md focus:outline-1 focus:outline-primary-800 invalid:outline-red-800 invalid:border-red-600')}
      <label className='absolute -top-2.5 left-2 bg-white px-3 text-xs rounded-md text-slate-500 peer-focus:text-primary-800 peer-focus:font-semibold peer-invalid:text-red-600' htmlFor={id}>{label}</label>
      <div className='px-3 peer-invalid:block peer-invalid:text-red-600 text-xs hidden'>{ invalidMessage }</div>
    </div>
  );
}

export interface InputProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  input?: HTMLProps<HTMLInputElement>;
  invalidMessage?: string;
}

export function Input({label, id, name, input, type="text", invalidMessage}: InputProps){
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if(input?.ref && inputRef.current) {
      (input.ref as unknown as React.MutableRefObject<HTMLInputElement>).current = inputRef.current;
    }
  }, [input?.ref])
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setCustomValidity(invalidMessage || "");
    }
  }, [invalidMessage]);
  return (
    <InputLayout label={label} id={id} invalidMessage={invalidMessage}>
      { className => <input ref={inputRef} className={className} type={type} id={id} name={name} {...input}></input>}
    </InputLayout>
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
    <InputLayout  label={label} id={id}>
      { className => (
        <select {...select} className={className}>
          { options.map(option => <option key={option.id} value={option.value}>{option.label}</option>) }
        </select>
      )}
    </InputLayout>
  )
}
