import React, { MutableRefObject, ReactNode } from "react";

export interface Filter<T> {
  getValue(): T | undefined;
  reset(): void;
  render(key?: React.Key): ReactNode;
}

interface TextFilterConfig {
  name: string,
  label: string,
}
export class TextFilter implements Filter<string> {
  _name: string;
  _label: string;
  _input: MutableRefObject<HTMLInputElement | null> = {current: null};

  constructor({name, label}: TextFilterConfig) {
    this._name = name;
    this._label = label;
  }

  getValue(): string | undefined {
    return this._input.current?.value;
  }

  reset(): void {
      if (this._input.current !== null) {
        this._input.current.value = '';
      }
  }

  render(key?: React.Key): ReactNode {
    return <TextFilterComponent key={key} name={this._name} label={this._label} inputRef={this._input}/>;
  }
}

interface TextFilterComponentProp {
  name: string;
  label: string;
  inputRef: MutableRefObject<HTMLInputElement | null>;

}
function TextFilterComponent({name, label, inputRef}: TextFilterComponentProp) {
  return (
    <div className="py-2">
      <label className="form-label" data-testid="label">{label}</label>
      <input className="form-control" name={name} data-testid="input" ref={inputRef} type="text"/>
    </div>
  );
}
