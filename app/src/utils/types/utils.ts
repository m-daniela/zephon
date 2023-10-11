

export type ErrorMessageType = {
    message: string, 
    reason?: string
}

export type ErrorMessageResponseType = {
    error: ErrorMessageType
}

export type AuthTokenType = null | undefined | string;