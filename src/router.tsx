import { createBrowserRouter } from "react-router-dom";
import { auth, authPage } from "./lib/auth";
import { SimplClient } from "./lib/resource-framework/simpl-client";
import HomePage from "./pages/home-page/home";
import IdentityAttributePage from "./pages/identity-attribute-page/identity-attribute";
import IdentityAttributeDetailsPage from "./pages/identity-attribute-details-page/identity-attribute-details";
import ParticipantTypesPage from "./pages/participant-types-page/participant-types";
import ApplicationInfo from "./pages/application-info-page/application-info";

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
    },
    {
        path: "/application/info",
        element: <ApplicationInfo/>,
    }
]);