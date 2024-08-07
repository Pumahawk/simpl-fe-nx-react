import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home-page";
import IdentityAttributePage from "./pages/identity-attribute-page";
import ParticipantTypesPage from "./pages/participant-types-page";
import { auth, authPage } from "./lib/auth";
import { SimplClient } from "./lib/resource-framework/simpl-client";
import IdentityAttributeDetailsPage from "./pages/identity-attribute-details-page";

export default createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "/identity-attributes",
        element: <IdentityAttributePage/>,
        loader: args => auth(args, {
            authenticated: true,
        }),
    },
    {
        path: "/identity-attributes/:id",
        element: <IdentityAttributeDetailsPage/>,
        loader: args => authPage(args, {
            authenticated: true,
        }, () => SimplClient.sap.identityAttibute.getById(args.params.id as string)),
    },
    {
        path: "/participant-types",
        element: <ParticipantTypesPage/>
    }
]);