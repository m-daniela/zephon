import React from "react";

type Props = {
    isLoading: boolean, 
    errorMessage: string | undefined,
    children: React.ReactNode
}

/**
 * Loading wrapper component 
 * Used to handle the loading state of a component until the
 * data finishes fetching. 
 * If there is an error message, it will be displayed. Otherwise, 
 * the data is displayed as defined by the children prop
 * @param {Props} props
 * @returns 
 */
const LoadingWrapper = ({ isLoading, errorMessage, children}: Props) => {
    return (
        <div>
            {
                isLoading ?
                    <span>Loading...</span>
                    :
                    <>
                        {
                            errorMessage ?
                                <span>
                                    {errorMessage}
                                </span>
                                :
                                <>
                                    {children}
                                </>
                        }
                    </>
            }
        </div>
    );
};

export default LoadingWrapper;
