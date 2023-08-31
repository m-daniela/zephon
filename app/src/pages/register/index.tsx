import { apiUrls, errorsToMessage, routes } from "@/utils/constants";
import { registerUser } from "@/utils/firebase/user_signup_login";
import { User } from "@/utils/types/user_types";
import { FirebaseError } from "firebase/app";
import Link from "next/link";
import React, { useState } from "react";


/**
 * Save the user in the database as well
 * @param user 
 * @returns user data | error message
 */
const registerUserCall = async (user: User) => {
    const response = await fetch(
        apiUrls.register, 
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(user)
        });
    return await response.json();
};

/**
 * Registration page
 * TODO: check password strength
 * TODO: save the token
 * @returns 
 */
const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "", 
        displayName: "",
        password: "", 
        retypePassword: "", 
    });
    const [error, setError] = useState("");

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name: string = e.target.name;
        const value: string = e.target.value;
        setFormData({
            ...formData, 
            [name]: value
        });
    };

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.password !== formData.retypePassword){
            setError(errorsToMessage["auth/matching-passwords"]);
            return;
        }
        try{
            const response = await registerUser(formData.email, formData.password);
            const dbResponse = await registerUserCall({
                email: response.email, 
                displayName: formData.displayName
            } as User);
            if (dbResponse.error){
                setError(dbResponse.error.message);
            }
            else{
                console.log(dbResponse);
            }
        }
        catch(error: unknown){
            if (error instanceof FirebaseError) {
                const errorMessage = errorsToMessage[error.code] ?? error.message;
                setError(errorMessage);
            }
            else {
                setError(JSON.stringify(error));
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleRegisterSubmit}>
                <label>Your email</label>
                <input 
                    type="email" 
                    name="email" 
                    required 
                    value={formData.email} 
                    onChange={handleOnChange}/>
                <label>Your name</label>
                <input 
                    type="text" 
                    name="displayName" 
                    required 
                    value={formData.displayName} 
                    onChange={handleOnChange}/>
                <label>Your password</label>
                <input 
                    type="password" 
                    name="password" 
                    required 
                    value={formData.password} 
                    onChange={handleOnChange}/>
                <label>Retype your password</label>
                <input 
                    type="password" 
                    name="retypePassword" 
                    required 
                    value={formData.retypePassword} 
                    onChange={handleOnChange}/>
                <button type="submit">Register</button>
                <span className="error-message">{error}</span>
            </form>
            <span>Already registered? <Link href={routes.login}>Login here</Link></span>
        </div>
    );
};

export default RegisterPage;
