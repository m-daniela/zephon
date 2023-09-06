import { FieldValue } from "firebase-admin/firestore";
import { firebasePaths } from "../utils/constants";
import { DBError } from "../utils/errors";
import { db } from "./config";


/**
 * Add the conversation ids to the specified participants
 * If at least one of the participants was not found, throw
 * an error
 * @param participants array of emails
 * @param conversationId 
 */
export const addConversationToUsers = async (participants: string[], conversationId: string) => {
    const usersRef = db.collection(firebasePaths.users);
    const users = await usersRef.where("email", "in", participants).get();
    // TODO: find the missing participants and include 
    // TODO: them in the error message
    if (users.size != participants.length) {
        throw new DBError("Some participants do not exist.");
    }
    for (const user of participants) {
        await usersRef.doc(user).update({
            conversations: FieldValue.arrayUnion(conversationId)
        });
    }
};