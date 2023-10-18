import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../components/errors/ErrorPage";
import LoginPage from "../pages/LoginPage";
import { routes } from "./constants";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "../components/routes/ProtectedRoute";
import RedirectionRoute from "../components/routes/RedirectionRoute";


/**
 * Router object for the RouterProvider
 */
export const router = createBrowserRouter([
    {
        path: routes.home,
        element: <ProtectedRoute><App /></ProtectedRoute>,
        errorElement: <ErrorPage />
    },
    {
        path: routes.login,
        element: <RedirectionRoute><LoginPage /></RedirectionRoute>,
        errorElement: <ErrorPage />
    },
    {
        path: routes.register,
        element: <RedirectionRoute><RegisterPage /></RedirectionRoute>,
        errorElement: <ErrorPage />
    },
]);