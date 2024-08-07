import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home-page";
import IdentityAttributePage from "./pages/identity-attribute-page";
import ParticipantTypesPage from "./pages/participant-types-page";
import { authPage } from "./lib/auth";

export default createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "/identity-attributes",
        element: <IdentityAttributePage/>,
        loader: args => authPage(args, {
            authenticated: true,
        })
    },
    {
        path: "/participant-types",
        element: <ParticipantTypesPage/>
    }
]);