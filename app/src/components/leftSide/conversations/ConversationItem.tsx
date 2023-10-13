import CustomDeleteAlert from "@/components/CustomDeleteAlert";
import { getParticipantsString } from "@/utils/functions";
import { ConversationType } from "@/utils/types/conversation_types";
import { SettingsIcon } from "@chakra-ui/icons";
import { 
    HStack, 
    MenuItem, 
    IconButton, 
    Menu, 
    MenuButton, 
    MenuList, 
    useDisclosure } from "@chakra-ui/react";
import React from "react";

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
export const ConversationItem = ({conversation, deleteConversation}: Props): React.JSX.Element => {
    // methods for triggering the delete popup
    const { isOpen, onOpen, onClose } = useDisclosure();
    const participants: string = getParticipantsString(conversation.participants);
    const conversationTitle: string = conversation.name || participants;
    const deleteMessage = "Are you sure you want to delete this" 
    + `conversation ${conversationTitle}?`; 

    const handleDeleteConversation = () => {
        deleteConversation(conversation.id);
        onClose();
    };
    return (
        <>
            <HStack>
                <span>{conversationTitle}</span>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label='Conversation Options'
                        icon={<SettingsIcon />}
                        variant='outline'
                    />
                    <MenuList>
                        <MenuItem onClick={onOpen}>
                        Delete...
                        </MenuItem>
                        <MenuItem>
                        Update...
                        </MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
            <CustomDeleteAlert 
                isOpen={isOpen} 
                onDelete={handleDeleteConversation}
                onClose={onClose} 
                message={deleteMessage} />
        </>
    );
};
