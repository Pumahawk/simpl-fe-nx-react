import { ReactNode, useState } from "react";
import { keycloak } from "../auth";
import { LoadingPage } from "./loading-component";
import UnauthorizedPage from "../../pages/unauthorized-page";

export interface AuthConfig {
    authenticated?: boolean,
    roles?: string[],
}

export interface AuthComponentConfig extends AuthConfig {
    children: ReactNode,
}

export function auth(page: ReactNode, config?: AuthConfig) {
    return (
        <AuthKeycloak {...config}>
            {page}
        </AuthKeycloak>
    )
}

export default function AuthKeycloak({children, authenticated = false, roles = []}: AuthComponentConfig) {

    const [status, setStatus] = useState<"load" | "ok" | "unauthorized">("load");


    if (status === "load" && (authenticated || roles?.length)) {
        if (keycloak.authenticated) {
            setStatus(roles?.length ? (roles.some(r => keycloak.hasRealmRole(r)) ? "ok" : "unauthorized") : "ok");
        } else {
            keycloak.login();
        }
    }

    switch(status) {
        case "load":
            return <LoadingPage/>;
        case "ok":
            return children;
        case "unauthorized":
            return <UnauthorizedPage/>;
    }
}