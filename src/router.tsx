import { createBrowserRouter, defer } from "react-router-dom";
import HomePage from "./pages/home-page";
import IdentityAttributePage from "./pages/identity-attribute-page";
import ParticipantTypesPage from "./pages/participant-types-page";
import { auth, authPage } from "./lib/auth";
import { SimplClient } from "./lib/resource-framework/simpl-client";

export default createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "/identity-attributes/:id",
        element: <IdentityAttributePage/>,
        loader: args => authPage(args, {
            authenticated: true,
        }, () => SimplClient.sap.identityAttibute.getById(args.params.id as string)),
    },
    {
        path: "/participant-types",
        element: <ParticipantTypesPage/>
    }
]);