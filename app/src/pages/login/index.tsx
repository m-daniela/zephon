import { useAuthContext } from "@/context/AuthenticationProvider";
import { loginUserCall } from "@/utils/apiCalls/user_operations";
import { errorsToMessage, routes } from "@/utils/constants";
import { loginUser } from "@/utils/firebase/user_signup_login";
import { FirebaseError } from "firebase/app";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";


/**
 * Login page
 */
const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "", 
        password: "", 
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

    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await loginUser(formData.email, formData.password);
            console.log(response);
            const token = await loginUserCall(formData.email);
            console.log("token", token);
            login(token.authToken);
            router.push(routes.home);
        }
        catch(error: unknown){
            console.log("error", error);
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
            <form className="custom-form" onSubmit={handleLoginSubmit}>
                <h1>Login to continue</h1>
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
                <span className="error-message">{error}</span>
                <button className="primary-button" type="submit">Login</button>
                <span className="action-span">
                    New here? <Link href="/register">Create an account.</Link></span>
            </form>
        </section>
    );
};

export default LoginPage;
