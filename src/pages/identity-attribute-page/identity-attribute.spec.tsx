import { findByRole, getAllByRole, getByText, render, screen } from '@testing-library/react';

import IdentityAttribute from './identity-attribute';
import { PagedModelIdentityAtttribute } from '../..//lib/resource-framework/simpl-client';

const iasp: PagedModelIdentityAtttribute = {
  content: [
    {id: "id1", code: "code1", name: "name1"},
    {id: "id2", code: "code2", name: "name2"},
    {id: "id3", code: "code3", name: "name3"},
  ],
  page: {
    number: 0,
    size: 10,
    totalElements: 22,
    totalPages: 2,
  }
}

vi.mock("../../lib/auth", () => ({}));

vi.mock("../../lib/resource-framework/simpl-client", () => ({
  SimplClient: {
    sap: {
      identityAttibute: {
        search: vi.fn(() => Promise.resolve(iasp))
      }
    }
  }
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn()
}));

describe('IdentityAttribute', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IdentityAttribute />);
    expect(baseElement).toBeTruthy();
  });
  it('should render list of identity attributes', async () => {
    render(<IdentityAttribute />); 
    const list = await screen.findByRole("list");
    expect(list).toBeTruthy();
    getAllByRole(list, "listitem").forEach((row, i) => {
      getByText(row, iasp.content[i].id);
      getByText(row, iasp.content[i].code);
      getByText(row, iasp.content[i].name);
    })

  });
});
