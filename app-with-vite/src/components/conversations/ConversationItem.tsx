import React, { useState } from "react";
import { getParticipantsString } from "../../utils/functions";
import { ConversationType } from "../../utils/types/conversation_types";
// import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import CustomDeleteAlert from "../shared/CustomDeleteAlert";


type Props = {
    conversation: ConversationType,
    deleteConversation: (conversationId: string) => Promise<void>
}

/**
 * Component to display the conversation name.
 * It also has a menu button attached, so the user
 * has access to other operations
 * @param {ConversationType} conversation
 * @returns 
 */
export const ConversationItem: React.FC<Props> = (
    {conversation, deleteConversation}: Props): React.JSX.Element => {
    // methods for triggering the delete popup
    // const { isOpen, onOpen, onClose } = useDisclosure();
    const [isOpen, setIsOpen] = useState(false);
    const participants: string = getParticipantsString(conversation.participants);
    const conversationTitle: string = conversation.name || participants;
    const deleteMessage = "Are you sure you want to delete this" 
    + `conversation ${conversationTitle}?`; 

    const handleDeleteConversation = () => {
        deleteConversation(conversation.id);
        handleClose();
    };

    const handleOnClickDelete = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className="conversation-item horizontal">
                <span>{conversationTitle}</span>
                <ClearRoundedIcon onClick={handleOnClickDelete} />
            </div>
            <CustomDeleteAlert 
                isOpen={isOpen} 
                onDelete={handleDeleteConversation}
                onClose={handleClose} 
                message={deleteMessage} />
        </>
    );
};
