import { MutableRefObject, ReactNode } from "react";

export interface Filter<T> {
  getValue(): T;
  render(): ReactNode;
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

  getValue(): string {
    if (this._input.current?.value == null) {
      throw new Error("Invalid implementation of TextFilter");
    } else {
      return this._input.current.value;
    }
  }

  render(): ReactNode {
    return <TextFilterComponent name={this._name} label={this._label} inputRef={this._input}/>;
  }
}

interface TextFilterComponentProp {
  name: string;
  label: string;
  inputRef: MutableRefObject<HTMLInputElement | null>;

}
function TextFilterComponent({name, label, inputRef}: TextFilterComponentProp) {
  return (
    <div>
      <label data-testid="label">{label}</label>
      <input name={name} data-testid="input" ref={inputRef} type="text"/>
    </div>
  );
}
