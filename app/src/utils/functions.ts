import { ErrorMessageType, ErrorMessageResponseType } from "./types/utils";


export const errorChecker = (error: unknown) => {
    if(error instanceof Error){
        return error;
    }
    
};

export const errorMessageBuilder = (message: string, reason?: string): ErrorMessageResponseType => {
    const error: ErrorMessageType = {
        message
    };
    if (reason) {
        error.reason = reason;
    }
    return {error};
};