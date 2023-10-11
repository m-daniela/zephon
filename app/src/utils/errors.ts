import { FirebaseError } from "firebase/app";
import { errorsToMessage } from "./constants";


export type ErrorMessageType = {
    message: string, 
    reason?: unknown
}

export type ErrorMessageResponseType = {
    error: ErrorMessageType
}

export const errorMessageBuilder = (
    message: string, reason?: unknown
): ErrorMessageResponseType => {
    const error: ErrorMessageType = {
        message
    };
    if (reason) {
        error.reason = reason;
    }
    return {error};
};

/**
 * Handle the error from a try catch block and return a message
 * @param error 
 * @returns error message object 
 */
export const handleError = (error: unknown): ErrorMessageResponseType => {
    let errorMessage = "Something went wrong... Please try again later.";
    let errorReason;
    if (error) {
        if (error instanceof Error){
            errorMessage = error.message;
            errorReason = error.stack;
        }
        else if (error instanceof FirebaseError){
            errorMessage = errorsToMessage[error.code]; 
            // errorMessage = `${error.code}: ${error.name} - ${error.message}`;
            errorReason = error.customData;
        }
        else {
            errorMessage = error.toString();
        }
    }
    return errorMessageBuilder(errorMessage, errorReason);
    
};