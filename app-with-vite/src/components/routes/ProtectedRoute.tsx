import { useAuthContext } from "../../utils/hooks";
import { routes } from "../../utils/constants";
import { Navigate } from "react-router-dom";
import { ChildrenPropsType } from "../../utils/types/utils";


/**
 * Protect route wrapper for routes that need authentication
 * @param {ChildrenPropsType} children children components to be displayed 
 * @returns 
 */
const ProtectedRoute: React.FC<ChildrenPropsType> = ({children}: ChildrenPropsType) => {
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
