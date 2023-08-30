export interface ErrorMessage {
    message: string, 
    reason?: string
}

export interface ErrorMessageResponse {
    error: ErrorMessage
}