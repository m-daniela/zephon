import { ErrorMessage, ErrorMessageResponse } from "../types/utils";

export const errorMessageBuilder = (message: string, reason?: string): ErrorMessageResponse => {
    const error: ErrorMessage = {
        message
    };
    if (reason) {
        error.reason = reason;
    }
    return {error};
};