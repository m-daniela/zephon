import React from "react";
import { ChildrenPropsType } from "../../utils/types/utils";
import { Spinner } from "@chakra-ui/react";

type Props = ChildrenPropsType & {
    isLoading: boolean, 
    errorMessage: string | undefined,
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
const LoadingWrapper: React.FC<Props> = ({ isLoading, errorMessage, children}: Props) => {
    return (
        <>
            {
                isLoading ?
                    <Spinner />
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
        </>
    );
};

export default LoadingWrapper;
