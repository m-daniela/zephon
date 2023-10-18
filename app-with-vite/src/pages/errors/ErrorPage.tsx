import React from "react";
import { useRouteError } from "react-router-dom";
import { handleRouteError } from "../../utils/errors";

/**
 * This is an error page which is shown when there are routing errors
 * @returns 
 */
const ErrorPage: React.FC = () => {
    const error = useRouteError();
    const errorMessageObject = handleRouteError(error);

    return (
        <section className="error-page">
            <section>
                <h1>{errorMessageObject.error.message}</h1>
                <p>{errorMessageObject.error.reason as string}</p>
            </section>
        </section>
    );
};

export default ErrorPage;