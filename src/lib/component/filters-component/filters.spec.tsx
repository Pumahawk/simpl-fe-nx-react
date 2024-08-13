import { fireEvent, getByText, render, screen } from '@testing-library/react';
import { TextFilter } from './filters';

describe('TextFilter', () => {
  it('should render successfully', () => {
    const tf = new TextFilter({
      label: "label",
      name: "input",
    });
    const { baseElement } = render(tf.render());
    expect(baseElement).toBeTruthy();
  });
  it('should change value in object', () => {
    const tf = new TextFilter({
      label: "label",
      name: "input",
    });
    render(tf.render());

    const input = screen.getByTestId('input');
    fireEvent.change(input, {
      target: {
        value: 'Test update form'
      }
    });

    expect(tf.getValue()).toBe('Test update form');
  })
  it('should render correct label', () => {
    const ts = new TextFilter({
      name: "Input name",
      label: "Test label",
    })
    render(ts.render());

    getByText(screen.getByTestId('label'), 'Test label');
  })
});
