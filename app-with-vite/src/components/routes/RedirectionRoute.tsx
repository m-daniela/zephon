import React from "react";
import { useAuthContext } from "../../utils/hooks";
import { routes } from "../../utils/constants";
import { Navigate } from "react-router-dom";

type Props = {
    children: React.ReactNode
}


/**
 * This is a redirection component for routes that don't need
 * to be accessed when the user is logged in (ex: Login, Register)
 * TODO: find a better name
 * @param {Props} children children components to be displayed 
 * @returns 
 */
const RedirectionRoute = ({children}: Props) => {
    const {email} = useAuthContext();
    if (email) {
        return <Navigate to={routes.home} replace/>;
    }
    return (
        <>
            {children}
        </>
    );
};

export default RedirectionRoute;
