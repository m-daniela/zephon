import { FieldPath } from "firebase-admin/firestore";
import { UserType } from "../types/user_types";
import { firebasePaths } from "../utils/constants";
import { errorMessageBuilder, handleError } from "../utils/errors";
import { db } from "./config";
import { ConversationType } from "../types/conversation_types";
import { MessageType } from "../types/message_types";

export const getUsers = async () => {
    const users: UserType[] = [];
    const snapshot = await db.collection("users").get();
    snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        users.push({
            ...(doc.data() as UserType)
        });
    });
    return users;
};


/**
 * Fetch the conversation data, without the messages
 * @param email 
 * @returns object with conversations
 */
export const getConversations = async (email: string) => {
    const usersRef = db.collection(firebasePaths.users);
    const user = await usersRef.doc(email).get();
    const conversations: {[key: string]: ConversationType} = {};
    if (!user.exists){
        return errorMessageBuilder(`Could not find the user with email ${email}`);
    }
    else {
        try {
            const conversationIds = (user.data() as UserType).conversations;
            const conversationsSnapshot = await db.collection(firebasePaths.conversations)
                .where(FieldPath.documentId(), "in", conversationIds).get();
            conversationsSnapshot.forEach(conversation => {
                conversations[conversation.id] = {
                    id: conversation.id,
                    ...conversation.data()
                } as ConversationType;
            });
            return {conversations};
        } catch (error: unknown) {
            return handleError(error);
        }
    }
};


/**
 * Check if the conversation exists
 * @param conversationId 
 * @returns true if conversation exists, false otherwise
 */
export const conversationExists = async (conversationId: string) => {
    const conversation = await db.collection(firebasePaths.conversations)
        .doc(conversationId).get();
    return conversation.exists;
};


/**
 * Get the messages for a given conversation. 
 * The messages are sent as an object containing 
 * messageId - messageData pairs.
 * @param conversationId 
 * @returns conversationId and the associated messages
 */
export const getMessages = async (conversationId: string) => {
    const isConversation = await conversationExists(conversationId);
    if (!isConversation){
        return errorMessageBuilder(`Could not find conversation ${conversationId}`);
    }
    const messages: {[key: string]: MessageType} = {};

    try {
        const messagesSnapshot = await db.collection(firebasePaths.messages(conversationId)).get();
        messagesSnapshot.forEach(message => {
            messages[message.id] = {
                id: message.id, 
                ...message.data()
            } as MessageType;
        });
    
        return {
            conversationId, 
            messages
        };
    } catch (error: unknown) {
        return handleError(error);
    }
};


/**
 * Check if the message exists
 * @param conversationId 
 * @param messageId 
 * @returns true if message exists, false otherwise
 */
export const messageExists = async (conversationId: string, messageId: string) => {
    const message = await db.collection(firebasePaths.messages(conversationId))
        .doc(messageId).get();
    return message.exists;
};