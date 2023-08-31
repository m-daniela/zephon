import { errorsToMessage } from "@/utils/constants";
import { loginUser } from "@/utils/firebase/user_signup_login";
import { FirebaseError } from "firebase/app";
import Link from "next/link";
import React, { useState } from "react";

/**
 * Login page
 * TODO: save the token
 */
const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "", 
        password: "", 
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

    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await loginUser(formData.email, formData.password);
            console.log(response);

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
            <form onSubmit={handleLoginSubmit}>
                <label>Your email</label>
                <input 
                    type="email" 
                    name="email" 
                    required 
                    value={formData.email} 
                    onChange={handleOnChange}/>
                <label>Your password</label>
                <input 
                    type="password" 
                    name="password" 
                    required 
                    value={formData.password} 
                    onChange={handleOnChange}/>
                <button type="submit">Login</button>
                <span className="error-message">{error}</span>
            </form>
            <span>New here? <Link href="/register">Create an account.</Link></span>
        </div>
    );
};

export default LoginPage;
