import { ErrorMessageResponseType } from "../errors";

export type AuthTokenType = null | undefined | string;

export type AuthTokenResponseType = {
    authToken: string;
}

export type ApiResponseType<T> = ErrorMessageResponseType | T