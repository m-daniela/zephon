import { ErrorMessage, ErrorMessageResponse } from "./types/utils";


export const errorChecker = (error: unknown) => {
    if(error instanceof Error){
        return error;
    }
    
};

export const errorMessageBuilder = (message: string, reason?: string): ErrorMessageResponse => {
    const error: ErrorMessage = {
        message
    };
    if (reason) {
        error.reason = reason;
    }
    return {error};
};