import CustomTag from "@/components/CustomTag";
import { HStack, VStack, Checkbox } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import React, { useState } from "react";
import { CreateConversationType } from "@/utils/types/conversation_types";
import { addConversationCall } from "@/utils/apiCalls/conversation_operations";
import { useAuthContext } from "@/context/AuthenticationProvider";
import { handleApiResponse } from "@/utils/functions";


const defaultConversation = {
    name: "", 
    participants: [], 
    isEncrypted: true
};

/**
 * Displays the add conversation form. 
 * The user can input the information necessary to 
 * create a conversation.
 * @returns 
 */
const AddConversation = (): React.JSX.Element => {
    const {email, token} = useAuthContext();
    const [conversation, setConversation] = useState<CreateConversationType>(defaultConversation);
    const [participant, setParticipant] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleSetParticipant = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setParticipant(e.target.value);
    };

    const handleAddParticipant = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        setConversation(state => {
            if (!state.participants.includes(participant)){
                state.participants.push(participant);
            }
            return state;
        });
        setParticipant("");
    };

    const handleRemoveParticipant = (participant: string): void => {
        setConversation(state => {
            return {
                ...state, 
                participants: state.participants.filter(
                    currentParticipant => currentParticipant !== participant)
            };
        });
    };

    const handleSetName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setConversation(state => {
            return {
                ...state, 
                name: e.target.value
            };
        });
    };

    const handleSetIsEncrypted = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setConversation(state => {
            return {
                ...state, 
                isEncrypted: !state.isEncrypted
            };
        });
    };

    const handleCreateConversation = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const message = await addConversationCall(
            {...conversation, participants: [email, ...conversation.participants]}, token);
        const response = handleApiResponse(message, setError);
        console.log(response, message);
        setConversation(defaultConversation);
    };

    return (
        <form onSubmit={handleCreateConversation}>
            <label>Conversation name</label>
            <input 
                type="text" 
                value={conversation.name} 
                placeholder="Conversation name..."
                onChange={handleSetName}/>
            <label>Add participants</label>
            <HStack>
                <input 
                    type="text" 
                    value={participant} 
                    placeholder="Participant email..."
                    onChange={handleSetParticipant}/>
                <IconButton 
                    aria-label="Add Participant" 
                    icon={<AddIcon />}
                    onClick={handleAddParticipant}/>
            </HStack>
            <VStack>
                <CustomTag 
                    key={participant} 
                    text={email} 
                />
                {
                    conversation.participants.map(participant => <CustomTag 
                        key={participant} 
                        text={participant} 
                        removeTag={handleRemoveParticipant}/>)
                }
            </VStack>
                
            <Checkbox 
                defaultChecked
                isChecked={conversation.isEncrypted}
                onChange={handleSetIsEncrypted}>
                        Ecrypted conversation</Checkbox>
            <p>{error}</p>
            <button type="submit">Create conversation</button>
        </form>
            
    );
};

export default AddConversation;
