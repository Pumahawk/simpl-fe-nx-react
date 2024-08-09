import { findByRole, getByText, render } from '@testing-library/react';

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
    const { baseElement } = render(<IdentityAttribute />); 
    const table = await findByRole(baseElement, "content");
    expect(table).toBeTruthy();
    table.childNodes.forEach((row, i) => {
      getByText(row as HTMLElement, iasp.content[i].id);
      getByText(row as HTMLElement, iasp.content[i].code);
      getByText(row as HTMLElement, iasp.content[i].name);
    })

  });
});
