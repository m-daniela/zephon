import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../components/errors/ErrorPage";
import Login from "../components/Login";


/**
 * Router object for the RouterProvider
 * TODO: replace with real information
 */
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    },
    {
        path: "login",
        element: <Login />,
    },
]);