import { render } from '@testing-library/react';

import ParticipantTypes from './participant-types';

describe('ParticipantTypes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ParticipantTypes />);
    expect(baseElement).toBeTruthy();
  });
});
