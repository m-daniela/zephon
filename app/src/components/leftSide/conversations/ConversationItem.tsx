import { getParticipantsString } from "@/utils/functions";
import { ConversationType } from "@/utils/types/conversation_types";
import React from "react";

type Props = {
    conversation: ConversationType
}

/**
 * Display the conversation item
 * @param {ConversationType} conversation
 * @returns 
 */
export const ConversationItem = ({conversation}: Props) => {
    const participants: string = getParticipantsString(conversation.participants);
    const conversationTitle: string = conversation.name || participants;

    return (
        <div>
            <span>{conversationTitle}</span>
        </div>
    );
};
