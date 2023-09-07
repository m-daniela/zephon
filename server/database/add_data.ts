import { FieldValue } from "firebase-admin/firestore";
import { FirebaseError } from "@firebase/util";
import { Conversation } from "../types/conversation_types";
import { firebasePaths } from "../utils/constants";
import { DBError } from "../utils/errors";
import { errorMessageBuilder } from "../utils/functions";
import { db } from "./config";
import { addConversationToUsers } from "./update_data";
import { Message } from "../types/message_types";
import { conversationExists } from "./get_data";


/**
 * Add the conversation to the database
 * Save the conversation id for each participant
 * @param conversationData conversation object
 * @returns conversationData, with id
 */
export const addConversation = async (conversationData: Conversation) => {
    const conversationRef = db.collection(firebasePaths.conversations).doc();

    try {
        await addConversationToUsers(conversationData.participants, conversationRef.id as string);
        const conversationWithTimestamp = {
            createdAt: FieldValue.serverTimestamp(), 
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
        if (error instanceof DBError){
            return errorMessageBuilder(error.message, error.stack);
        }
        if (error instanceof FirebaseError){
            return errorMessageBuilder(
                `${error.code}: ${error.name} - ${error.message}`, `${error.customData}`);
        }
        return errorMessageBuilder((error as Error).message, (error as Error).stack);
    }
};


/**
 * Add a message in the conversation
 * The messages will be added to a collection
 * inside the conversation document
 * @param conversationId 
 * @param messageData 
 * @returns messageData, with an id
 */
export const addMessage = async (conversationId: string, messageData: Message) => {

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
        if (error instanceof DBError){
            return errorMessageBuilder(error.message, error.stack);
        }
        if (error instanceof FirebaseError){
            return errorMessageBuilder(
                `${error.code}: ${error.name} - ${error.message}`, `${error.customData}`);
        }
        return errorMessageBuilder((error as Error).message, (error as Error).stack);
    }

};