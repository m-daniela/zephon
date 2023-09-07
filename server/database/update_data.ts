import { FieldValue, CollectionReference, DocumentData } from "firebase-admin/firestore";
import { firebasePaths } from "../utils/constants";
import { DBError } from "../utils/errors";
import { db } from "./config";


/**
 * Check if all participants exist
 * If at least one of the participants was not found, throw
 * an error
 * @param participants list of participants' emails
 */
export const checkParticipants = async (
    participants: string[], usersRef: CollectionReference<DocumentData>) => {
    // const usersRef = db.collection(firebasePaths.users);
    const users = await usersRef.where("email", "in", participants).get();
    // TODO: find the missing participants and include 
    // TODO: them in the error message
    if (users.size != participants.length) {
        throw new DBError("Some participants do not exist.");
    }
};


/**
 * Add the conversation id to the specified participants
 * @param participants array of emails
 * @param conversationId 
 */
export const addConversationToUsers = async (participants: string[], conversationId: string) => {
    const usersRef = db.collection(firebasePaths.users);
    await checkParticipants(participants, usersRef);
    for (const user of participants) {
        await usersRef.doc(user).update({
            conversations: FieldValue.arrayUnion(conversationId)
        });
    }
};


/**
 * Remove the conversation id from the specified participants
 * @param participants array of emails
 * @param conversationId 
 */
export const removeConversationFromUsers = async (
    participants: string[], conversationId: string) => {
    const usersRef = db.collection(firebasePaths.users);
    await checkParticipants(participants, usersRef);
    for (const user of participants) {
        await usersRef.doc(user).update({
            conversations: FieldValue.arrayRemove(conversationId)
        });
    }
};