import { FirebaseError } from "@firebase/util";
import { batchSize, firebasePaths } from "../utils/constants";
import { errorMessageBuilder } from "../utils/functions";
import { db } from "./config";
import { conversationExists, messageExists } from "./get_data";
import { removeConversationFromUsers } from "./update_data";
import { Conversation } from "../types/conversation_types";
import { DocumentData, Firestore, Query } from "firebase-admin/firestore";
import { DeleteResolve } from "../types/utils";


/**
 * Remove the conversation data
 * @param conversationId 
 */
const deleteConversation = async (conversationId: string): Promise<void> => {
    await db.collection(firebasePaths.conversations).doc(conversationId).delete();
};


/**
 * Recursively remove the messages in batches, asynchronously
 * @param db 
 * @param query 
 * @param resolve 
 * @param conversationId 
 * @returns 
 */
const deleteQueryBatch = async (
    db: Firestore, query: Query<DocumentData>, 
    resolve: DeleteResolve, conversationId: string) => {
    const messagesSnapshot = await query.get();

    // when there are no more messages, delete the conversation
    if (messagesSnapshot.size === 0) {
        resolve(deleteConversation(conversationId));
        return;
    }

    const batch = db.batch();
    messagesSnapshot.docs.forEach(message => {
        batch.delete(message.ref);
    });
    await batch.commit();
    process.nextTick(() => {
        deleteQueryBatch(db, query, resolve, conversationId);
    });
};


/**
 * Remove the conversation
 * The id removed from the participants' conversation 
 * lists and then the messages and conversation are 
 * removed asynchronously in the background  
 * @param conversationId 
 * @returns conversationId
 */
export const deleteConversationWrapper = async (conversationId: string) => {
    const isConversation = await conversationExists(conversationId);
    if (!isConversation){
        return errorMessageBuilder(`Could not find conversation ${conversationId}`);
    }
    const conversationRef = db.collection(firebasePaths.conversations).doc(conversationId);
    const conversationSnapshot = await conversationRef.get();
    const conversation = conversationSnapshot.data() as Conversation;

    // remove the conversation from the participants' conversations
    // to make sure it will not be displayed later
    await removeConversationFromUsers(conversation.participants, conversationId);

    const messagesRef = db.collection(firebasePaths.messages(conversationId));
    // split the messages in batches and recursively remove them
    const messagesQuery = messagesRef.limit(batchSize);
    (new Promise((resolve, reject) => {
        deleteQueryBatch(db, messagesQuery, resolve, conversationId).catch(reject);
    }));
    return {
        id: conversationId
    };
};


export const deleteMessage = async (conversationId: string, messageId: string) => {
    const isConversation = await conversationExists(conversationId);
    if (!isConversation){
        return errorMessageBuilder(`Could not find conversation ${conversationId}`);
    }

    const isMessage = await messageExists(conversationId, messageId);
    if (!isMessage){
        return errorMessageBuilder(`Could not find message ${messageId}`);
    }

    try{
        await db.collection(firebasePaths.messages(conversationId)).doc(messageId).delete();
        return {
            id: messageId
        };
    }
    catch (error: unknown){
        if (error instanceof FirebaseError){
            return errorMessageBuilder(
                `${error.code}: ${error.name} - ${error.message}`, `${error.customData}`);
        }
        return errorMessageBuilder((error as Error).message, (error as Error).stack);
    }
};