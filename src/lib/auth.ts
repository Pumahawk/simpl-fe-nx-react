import Keycloak from "keycloak-js";

export const keycloak = new Keycloak({
  url: window["env"]["KEYCLOAK_URL"],
  realm: window["env"]["KEYCLOAK_REALM"],
  clientId: window["env"]["KEYCLOAK_CLIENT_ID"],
});

export const initKeycloak = keycloak.init({
  onLoad: "check-sso",
});
