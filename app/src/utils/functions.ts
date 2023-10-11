import React from "react";
import { ApiResponseType } from "./types/utils";

/**
 * Checks if the api response contains is an error message.
 * If so, the error message is handled using the passed 
 * function (if exists), otherwise, the response object is 
 * returned back.
 * @param response 
 * @param handleMessage 
 * @returns void | response
 */
export function handleApiResponse<T>(
    response: ApiResponseType<NonNullable<T>>, 
    handleMessage?: React.Dispatch<React.SetStateAction<string>>) {
    if (typeof response === "object" && "error" in response && handleMessage) {
        handleMessage(response.error.message);
        return;
    }
    return response;
}