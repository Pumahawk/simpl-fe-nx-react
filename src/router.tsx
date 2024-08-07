import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home-page";
import IdentityAttributePage from "./pages/identity-attribute-page";
import ParticipantTypesPage from "./pages/participant-types-page";
import { auth } from "./lib/component/auth-component";

export default createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "/identity-attributes",
        element: auth(<IdentityAttributePage/>, {
            authenticated: true,
        })
    },
    {
        path: "/participant-types",
        element: <ParticipantTypesPage/>
    }
]);