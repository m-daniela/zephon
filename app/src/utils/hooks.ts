import { useAuthContext } from "@/context/AuthenticationProvider";
import useSWR from "swr";
import { getConversationsFetcher } from "./apiCalls/conversation_operations";
import {useEffect, useState} from "react";
import { handleApiResponse } from "./functions";
import { handleError } from "./errors";


/**
 * **Use conversations hook**
 * This hook is responsible for fetching the data about the conversations 
 * using SWR.
 * It also handles the cases when there is an error thrown and when the 
 * api returns an error message. In both cases, the error is parsed and 
 * and saved inside the errorMessage state, so it can be returned in the 
 * calling component. 
 * TODO: generalize so other calls can use this?
 * @returns 
 */
export const useConversations = () => {
    const {email, token} = useAuthContext();
    const [errorMessage, setErrorMessage] = useState("");
    const {data, error, isLoading} = useSWR(
        [email, token], ([email, token]) => getConversationsFetcher(email, token),
        {
            onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
                // Never retry on 404.
                if (error.status === 404) return;

                // Retry 3 times 
                if (retryCount >= 3) return;
            }
        }
    );
    // used this to avoid multiple re-renders
    useEffect(() => {
        // if an error was thrown, parse it and set the error message
        if (error){
            handleApiResponse(handleError(error), setErrorMessage);
        }
        // if the api returned an error message, parse it and set
        // the error message
        if (data){
            handleApiResponse(data, setErrorMessage);
        }
    }, [error, data]);
    return {
        data, 
        errorMessage, 
        isLoading
    };
};