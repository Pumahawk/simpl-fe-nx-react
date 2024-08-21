import { render } from '@testing-library/react';
import { Input } from './form-inputs';


describe('FormInputs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Input id='id' label='label' name='name' />);
    expect(baseElement).toBeTruthy();
  });
});
