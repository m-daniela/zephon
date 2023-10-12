import { apiUrls } from "../constants";
import { ConversationResponseType } from "../types/conversation_types";
import { ApiResponseType, AuthTokenType } from "../types/utils";


/**
 * Fetches the conversations of the given user.
 * This is used as a fetcher function for SWR.
 * The response can be the conversations data 
 * or an error message.
 * @param {string} email 
 * @param {string} token 
 * @returns conversation data | error message
 */
export const getConversationsFetcher = async (
    email: string, token: AuthTokenType): Promise<ApiResponseType<ConversationResponseType>> => {
    const response = await fetch(
        apiUrls.getConversations, 
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({email})
        });
    return await response.json();
};
