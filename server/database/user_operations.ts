import { FirebaseError } from "@firebase/util";
import { UserType } from "../types/user_types";
import { errorMessageBuilder } from "../utils/errors";
import { db } from "./config";
import { firebasePaths } from "../utils/constants";


/**
 * Add the user in the database
 * OBS: this is different from the authentication
 * database. This is only used to reference the 
 * conversations associated with a user
 * @param userData: User
 * @returns user data and the authentication token
 */
export const register = async (userData: UserType) => {
    const userExists: boolean = await isUser(userData.email);
    if (userExists) {
        return errorMessageBuilder(
            `A user with email ${userData.email} already exists`
        );
    }
    const docRef = db.collection(firebasePaths.users).doc(userData.email);

    try{
        await docRef.set(userData);
    }
    catch(error: unknown){
        if (error instanceof FirebaseError){
            return errorMessageBuilder(
                `${error.code}: ${error.name} - ${error.message}`, `${error.customData}`);
        }
        return errorMessageBuilder(`${error}`);
    }
};


/**
 * Check if the user exists
 * @param email: string 
 * @returns boolean
 */
export const isUser = async (email: string): Promise<boolean> => {
    const userRef = db.collection(firebasePaths.users).doc(email);
    const user = await userRef.get();
    return user.exists;
};
