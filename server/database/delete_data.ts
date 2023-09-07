import { FirebaseError } from "@firebase/util";
import { firebasePaths } from "../utils/constants";
import { errorMessageBuilder } from "../utils/functions";
import { db } from "./config";
import { conversationExists, messageExists } from "./get_data";


export const deleteConversation = async (conversationId: string) => {
    /**
     * find conversation
     * find participants
     * delete conversation from participants' convo list
     * delete conversation
     * * delete messages from collection
     */
    // const conversationRef = 
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