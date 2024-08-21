import { render } from '@testing-library/react';

import FormInputs from './form-inputs';

describe('FormInputs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormInputs />);
    expect(baseElement).toBeTruthy();
  });
});
