import { useAuthContext } from "@/context/AuthenticationProvider";
import { registerUserCall } from "@/utils/apiCalls/user_operations";
import { errorsToMessage, routes } from "@/utils/constants";
import { registerUser } from "@/utils/firebase/user_signup_login";
import { UserType } from "@/utils/types/user_types";
import { FirebaseError } from "firebase/app";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";


/**
 * Registration page
 * TODO: check password strength
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
    const {login, token} = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (token) {
            router.push(routes.home);
        }
    }, [token, router]);

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
            } as UserType);
            if (dbResponse.error){
                setError(dbResponse.error.message);
            }
            else{
                console.log(dbResponse);
                login(dbResponse.authToken);
                router.push(routes.home);
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
        <section className="form-section">
            <form className="custom-form" onSubmit={handleRegisterSubmit}>
                <h1>Create a new account</h1>
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
                <span className="error-message">{error}</span>
                <button className="primary-button" type="submit">Register</button>
                <span className="action-span">
                    Already registered? <Link href={routes.login}>Login here</Link></span>
            </form>
        </section>
    );
};

export default RegisterPage;
