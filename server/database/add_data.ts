import { FieldValue } from "firebase-admin/firestore";
import { ConversationType } from "../types/conversation_types";
import { firebasePaths } from "../utils/constants";
import { handleError } from "../utils/errors";
import { errorMessageBuilder } from "../utils/errors";
import { db } from "./config";
import { addConversationToUsers } from "./update_data";
import { MessageType } from "../types/message_types";
import { conversationExists } from "./get_data";


/**
 * Add the conversation to the database
 * Save the conversation id for each participant
 * @param conversationData conversation object
 * @returns conversationData, with id | error
 */
export const addConversation = async (conversationData: ConversationType) => {
    const conversationRef = db.collection(firebasePaths.conversations).doc();

    try {
        await addConversationToUsers(conversationData.participants, conversationRef.id as string);
        const conversationWithTimestamp = {
            dateCreated: FieldValue.serverTimestamp(), 
            // timestamp: FieldValue.serverTimestamp(), 
            ...conversationData
        };
        await conversationRef.set(conversationWithTimestamp);
        return {
            id: conversationRef.id, 
            ...conversationWithTimestamp
        };
    }
    catch (error: unknown){
        return handleError(error);
    }
};


/**
 * Add a message in the conversation
 * The messages will be added to a collection
 * inside the conversation document
 * @param conversationId 
 * @param messageData 
 * @returns messageData, with an id | error
 */
export const addMessage = async (conversationId: string, messageData: MessageType) => {

    const isConversation = await conversationExists(conversationId);
    if (!isConversation){
        return errorMessageBuilder(`Could not find conversation ${conversationId}`);
    }

    const messageRef = db.collection(firebasePaths.messages(conversationId)).doc();

    try{
        const messageDataWithTimestamp = {
            ...messageData, 
            dateSent: FieldValue.serverTimestamp()
        };
        await messageRef.set(messageDataWithTimestamp);
        return {
            id: messageRef.id, 
            ...messageData
        };
    }
    catch (error: unknown){
        return handleError(error);
    }

};