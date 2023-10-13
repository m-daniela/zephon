import { useConversations } from "@/utils/hooks";
import { ConversationResponseType } from "@/utils/types/conversation_types";
import React from "react";
import { ConversationItem } from "./ConversationItem";
import LoadingWrapper from "@/components/LoadingWrapper";
import { handleApiResponse } from "@/utils/functions";
import { deleteConversationCall } from "@/utils/apiCalls/conversation_operations";
import { useAuthContext } from "@/context/AuthenticationProvider";


/**
 * Display the list of conversations of the current user.
 * The delete function is attached here to each conversation.
 * @returns 
 */
const Conversations = (): React.JSX.Element => {
    const {token} = useAuthContext();
    const {data, errorMessage, isLoading} = useConversations();
    const conversations = data && (data as ConversationResponseType).conversations;
    console.log(data, errorMessage, isLoading);
    
    const deleteConversation = async (conversationId: string): Promise<void> => {
        const message = await deleteConversationCall(conversationId, token);
        const response = handleApiResponse(message);
        console.log(response, message);
    };

    return (
        <LoadingWrapper errorMessage={errorMessage} isLoading={isLoading}>
            <>
                {
                    conversations && 
                        Object.keys(conversations).map(
                            (conversationId: string) => <ConversationItem 
                                key={conversationId} 
                                conversation={conversations[conversationId]}
                                deleteConversation={deleteConversation} />
                        )
                }
            </>
        </LoadingWrapper>
    );
};

export default Conversations;
