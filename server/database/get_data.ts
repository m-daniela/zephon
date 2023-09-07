import { FieldPath } from "firebase-admin/firestore";
import { User } from "../types/user_types";
import { firebasePaths } from "../utils/constants";
import { errorMessageBuilder } from "../utils/functions";
import { db } from "./config";
import { Conversation } from "../types/conversation_types";
import { Message } from "../types/message_types";

export const getUsers = async () => {
    const snapshot = await db.collection("users").get();
    snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
    });
};


/**
 * Fetch the conversation data, without the messages
 * @param email 
 * @returns object with conversations
 * {
 *      conversations: {
 *          conversationId: {
 *              conversationData
 *          }
 *      }
 * }
 */
export const getConversations = async (email: string) => {
    const usersRef = db.collection(firebasePaths.users);
    const user = await usersRef.doc(email).get();
    const conversations: {[key: string]: Conversation} = {};
    if (!user.exists){
        return errorMessageBuilder(`Could not find the user with email ${email}`);
    }
    else {
        const conversationIds = (user.data() as User).conversations;
        const conversationsSnapshot = await db.collection(firebasePaths.conversations)
            .where(FieldPath.documentId(), "in", conversationIds).get();
        conversationsSnapshot.forEach(conversation => {
            conversations[conversation.id] = {
                id: conversation.id,
                ...conversation.data()
            } as Conversation;
        });
        return {conversations};
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
 * 
 * @param conversationId 
 * @returns conversationId and the associated messages
{
    conversationId, 
    messages {
        messageId: {
            id: messageId,
            ...messageData
        }
    }
}
 */
export const getMessages = async (conversationId: string) => {
    const isConversation = await conversationExists(conversationId);
    if (!isConversation){
        return errorMessageBuilder(`Could not find conversation ${conversationId}`);
    }
    const messages: {[key: string]: Message} = {};
    const messagesSnapshot = await db.collection(firebasePaths.messages(conversationId)).get();
    messagesSnapshot.forEach(message => {
        messages[message.id] = {
            id: message.id, 
            ...message.data()
        } as Message;
    });

    return {
        conversationId, 
        messages
    };
};