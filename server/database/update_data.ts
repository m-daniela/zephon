import { 
    FieldValue, 
    CollectionReference, 
    DocumentData, 
    DocumentReference } from "firebase-admin/firestore";
import { firebasePaths } from "../utils/constants";
import { DBError, handleError } from "../utils/errors";
import { db } from "./config";
import { ConversationType } from "../types/conversation_types";
import { conversationExists } from "./get_data";
import { errorMessageBuilder } from "../utils/errors";


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


/**
 * Update conversation data
 * @param conversationId 
 * @param conversationData 
 * @returns 
 */
export const updateConversation = async (
    conversationId: string, conversationData: ConversationType) => {
    const isConversation = await conversationExists(conversationId);
    if (!isConversation){
        return errorMessageBuilder(`Could not find conversation ${conversationId}`);
    }

    const conversationRef = db.collection(firebasePaths.conversations).doc(conversationId);
    const simplifiedConverastionData = {...conversationData};
    delete simplifiedConverastionData.id;
    delete simplifiedConverastionData.dateCreated;

    try {
        await checkConversationParicipants(
            conversationId, 
            conversationData.participants, 
            conversationRef);
        await conversationRef.update(simplifiedConverastionData);
        return conversationData;
    }
    catch (error: unknown){
        return handleError(error);
    }
};


/**
 * Add or remove participants
 * Checks if there are new or removed participants and
 * adds or deletes the conversation id from their lists 
 * @param conversationId 
 * @param participants 
 * @param conversationRef 
 */
const checkConversationParicipants = async (
    conversationId: string, participants: string[], 
    conversationRef: DocumentReference<DocumentData>) => {
    const conversation = (await conversationRef.get()).data() as ConversationType;
    const existingParticipants = conversation.participants;
    const newParticipants = participants.filter(
        participant => !existingParticipants.includes(participant));
    const removedParticipants = existingParticipants.filter(
        participant => !participants.includes(participant)
    );

    if (newParticipants.length) await addConversationToUsers(newParticipants, conversationId);
    if (removedParticipants.length) {
        await removeConversationFromUsers(removedParticipants, conversationId);
    }
};