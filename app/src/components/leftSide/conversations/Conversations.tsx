import { useConversations } from "@/utils/hooks";
import { ConversationResponseType } from "@/utils/types/conversation_types";
import React from "react";
import { ConversationItem } from "./ConversationItem";
import LoadingWrapper from "@/components/LoadingWrapper";


/**
 * Display a list of conversations
 * @returns 
 */
const Conversations = () => {
    const {data, errorMessage, isLoading} = useConversations();
    const conversations = data && (data as ConversationResponseType).conversations;
    console.log(data, errorMessage, isLoading);
    return (
        <LoadingWrapper errorMessage={errorMessage} isLoading={isLoading}>
            <>
                {
                    conversations && 
                        Object.keys(conversations).map(
                            (conversationId: string) => <ConversationItem 
                                key={conversationId} 
                                conversation={conversations[conversationId]} />
                        )
                }
            </>
        </LoadingWrapper>

    );
};

export default Conversations;
