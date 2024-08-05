import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home-page";
import IdentityAttributePage from "./pages/identity-attribute-page";
import ParticipantTypesPage from "./pages/participant-types-page";

export default createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "/identity-attributes",
        element: <IdentityAttributePage/>
    },
    {
        path: "/participant-types",
        element: <ParticipantTypesPage/>
    }
]);