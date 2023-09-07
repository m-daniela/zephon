export interface ErrorMessage {
    message: string, 
    reason?: string
}

export interface ErrorMessageResponse {
    error: ErrorMessage
}

export type DeleteResolve = (value?: void | PromiseLike<void>) => void;
