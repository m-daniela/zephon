import { FieldPath } from "firebase-admin/firestore";
import { User } from "../types/user_types";
import { firebasePaths } from "../utils/constants";
import { errorMessageBuilder } from "../utils/functions";
import { db } from "./config";
import { Conversation } from "../types/conversation_types";

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