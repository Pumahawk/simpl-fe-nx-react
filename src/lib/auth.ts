import Keycloak, { KeycloakInitOptions } from "keycloak-js";

export class KeycloakApp {
  static client;
  static initPromise;

  static {
    this.client = new Keycloak({
      url: window["env"]["KEYCLOAK_URL"],
      realm: window["env"]["KEYCLOAK_REALM"],
      clientId: window["env"]["KEYCLOAK_CLIENT_ID"],
    });

    this.initPromise = this.client.init({
      onLoad: "check-sso",
    });
  }
}
