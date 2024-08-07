import { keycloak } from "../auth";

export interface PageMetadata {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface PagedModel<T> {
  content: T[];
  page: PageMetadata;
}

export interface IdentityAttribute {
  id: string;
  code: string;
  name: string;
  // TODO...
}

export interface PagedModelIdentityAtttribute
  extends PagedModel<IdentityAttribute> {}

export interface IdentityAttributeSearchParams {
  id?: string;
}
const identityAttibuteClient = {
  async search(params: IdentityAttributeSearchParams) {
    const config = await baseFetchConfig();
    return await fetch(url("/private/sap-api/identity-attribute/search"), {
      ...config,
    }).then((resp) => resp.json());
  },
};

export const SimplClient = {
  sap: {
    identityAttibute: identityAttibuteClient,
  },
};

export function url(path: string): string {
  return window["env"]["API_URL"] + (path.startsWith("/") ? path : "/" + path);
}

export async function baseFetchConfig(): Promise<RequestInit> {
  const token = keycloak.token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
