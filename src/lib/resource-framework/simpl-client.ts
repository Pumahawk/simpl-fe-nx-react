import { keycloak } from "../auth";

const URL_SAP_IA_SEARCH = "/private/sap-api/identity-attribute/search";
const URL_SAP_IA_ID = (id: string) =>
  `/private/sap-api/identity-attribute/${id}`;

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
  name?: string;
  code?: string;
  page?: number;
  size?: number;
}
const identityAttibuteClient = {
  async search(
    params?: IdentityAttributeSearchParams
  ): Promise<PagedModelIdentityAtttribute> {
    return (
      await initFetch<PagedModelIdentityAtttribute>(
        url(URL_SAP_IA_SEARCH, params)
      )
    )();
  },

  async getById(id: string): Promise<IdentityAttribute> {
    return (await initFetch<IdentityAttribute>(url(URL_SAP_IA_ID(id))))();
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

function getToken(): Promise<string> {
  return keycloak.isTokenExpired(5)
    ? keycloak.updateToken().then(() => keycloak.token!)
    : Promise.resolve(keycloak.token!);
}

export async function initFetch<T>(
  path: string,
  mapConfig?: (arg: RequestInit) => RequestInit
) {
  const token = await getToken();
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
