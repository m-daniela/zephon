import { apiUrls } from "../constants";
import { User } from "../types/user_types";

export const loginUserCall = async (email: string) => {
    const response = await fetch(
        apiUrls.login, 
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Credentials": "true",
            },
            credentials: "same-origin",
            body: JSON.stringify({email})
        });
    return await response.json();
};


/**
 * Save the user in the database as well
 * @param user 
 * @returns user data | error message
 */
export const registerUserCall = async (user: User) => {
    const response = await fetch(
        apiUrls.register, 
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Credentials": "true",
            },
            credentials: "same-origin",
            body: JSON.stringify(user)
        });
    return await response.json();
};