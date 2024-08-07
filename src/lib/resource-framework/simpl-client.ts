import { keycloak } from "../auth";

const URL_SAP_IA_SEARCH = "/private/sap-api/identity-attribute/search";
const URL_SAP_IA_ID = (id: string) => `/identity-attribute/${id}`;

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
  search(
    params?: IdentityAttributeSearchParams
  ): Promise<PagedModelIdentityAtttribute> {
    return initFetch<PagedModelIdentityAtttribute>(
      url(URL_SAP_IA_SEARCH, params)
    )();
  },
};

export const SimplClient = {
  sap: {
    identityAttibute: identityAttibuteClient,
  },
};

function url(path: string, params?: { [k: string]: any }): string {
  const url =
    window["env"]["API_URL"] + (path.startsWith("/") ? path : "/" + path);
  const qp = params ? "?" + new URLSearchParams(Object.entries(params)) : "";
  return `${url}${qp}`;
}

export function initFetch<T>(
  path: string,
  mapConfig?: (arg: RequestInit) => RequestInit
) {
  const token = keycloak.token;
  const config: RequestInit = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (patchConf?: RequestInit) =>
    fetch(path, {
      ...(mapConfig ? mapConfig(config) : config),
      ...patchConf,
    }).then((r) => r.json() as T);
}
