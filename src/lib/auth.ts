import Keycloak from "keycloak-js";
import { LoaderFunctionArgs } from "react-router-dom";

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

export interface AuthConfig {
  authenticated?: boolean;
  roles?: string[];
}

export async function auth(
  args: LoaderFunctionArgs,
  config: AuthConfig
): Promise<"authenticated" | "no-authenticated"> {
  if (config.authenticated || config.roles?.length) {
    await initKeycloak;
    if (keycloak.authenticated) {
      if (config.roles?.length) {
        if (config.roles.some((r) => keycloak.hasRealmRole(r))) {
          return "authenticated";
        } else {
          throw new Response("Unauthorized", { status: 401 });
        }
      } else {
        return "authenticated";
      }
    } else {
      await keycloak.login({
        redirectUri: args.request.url,
      });
      return "authenticated";
    }
  } else {
    return "no-authenticated";
  }
}
