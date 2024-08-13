import { render } from '@testing-library/react';

import ParticipantTypes from './participant-types';

vi.mock('../../lib/auth', () => ({
  keycloak: {}
}));

describe('ParticipantTypes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ParticipantTypes />);
    expect(baseElement).toBeTruthy();
  });
});
