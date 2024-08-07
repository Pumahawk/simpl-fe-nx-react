import Keycloak from "keycloak-js";
import { LoaderFunction } from "react-router-dom";

export const keycloak = new Keycloak({
  url: window["env"]["KEYCLOAK_URL"],
  realm: window["env"]["KEYCLOAK_REALM"],
  clientId: window["env"]["KEYCLOAK_CLIENT_ID"],
});

export const initKeycloak = keycloak.init({
  onLoad: "check-sso",
  silentCheckSsoRedirectUri:
    window.location.origin + "/assets/silent-check-sso.html",
});

export interface AuthConfig<T> {
  authenticated?: boolean;
  roles?: string[];
  loader?: LoaderFunction<T>;
}

export function auth<T>(config: AuthConfig<T>): LoaderFunction<T> | undefined {
  if (config.authenticated || config.roles?.length) {
    return (args, handlerCtx) =>
      initKeycloak.then(() => {
        const loader = config.loader ?? (() => null);
        if (keycloak.authenticated) {
          if (config.roles?.length) {
            if (config.roles.some((r) => keycloak.hasRealmRole(r))) {
              return Promise.resolve(loader(args, handlerCtx));
            } else {
              throw new Response("Unauthorized", { status: 401 });
            }
          } else {
            return Promise.resolve(loader(args, handlerCtx));
          }
        } else {
          return new Promise(() =>
            keycloak.login({
              redirectUri: args.request.url,
            })
          );
        }
      });
  }
}
