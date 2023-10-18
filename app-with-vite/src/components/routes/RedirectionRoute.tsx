import { useAuthContext } from "../../utils/hooks";
import { routes } from "../../utils/constants";
import { Navigate } from "react-router-dom";
import { ChildrenPropsType } from "../../utils/types/utils";


/**
 * This is a redirection component for routes that don't need
 * to be accessed when the user is logged in (ex: Login, Register)
 * TODO: find a better name
 * @param {ChildrenPropsType} children children components to be displayed 
 * @returns 
 */
const RedirectionRoute: React.FC<ChildrenPropsType> = ({children}: ChildrenPropsType) => {
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
