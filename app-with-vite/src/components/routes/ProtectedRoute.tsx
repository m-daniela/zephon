import React from "react";
import { useAuthContext } from "../../utils/hooks";
import { routes } from "../../utils/constants";
import { Navigate } from "react-router-dom";

type Props = {
    children: React.ReactNode
}

/**
 * Protect route wrapper for routes that need authentication
 * @param {Props} children children components to be displayed 
 * @returns 
 */
const ProtectedRoute = ({children}: Props) => {
    const {email} = useAuthContext();

    if (!email){
        return <Navigate to={routes.login} replace/>;
    }
    return (
        <>
            {children}
        </>
    );
};

export default ProtectedRoute;
