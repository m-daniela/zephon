import { FirebaseError } from "@firebase/util";

export type ErrorMessageType = {
    message: string, 
    reason?: unknown
}

export type ErrorMessageResponseType = {
    error: ErrorMessageType
}

export class DBError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DBError";
        Error.captureStackTrace(this);
    }
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
        if (error instanceof Error || error instanceof DBError){
            errorMessage = error.message;
            errorReason = error.stack;
        }
        else if (error instanceof FirebaseError){
            errorMessage = `${error.code}: ${error.name} - ${error.message}`;
            errorReason = error.customData;
        }
        else {
            errorMessage = error.toString();
        }
    }
    return errorMessageBuilder(errorMessage, errorReason);
    
};