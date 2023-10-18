import { Link, useNavigate } from "react-router-dom";
import { loginUserCall } from "../utils/apiCalls/user_operations";
import { routes } from "../utils/constants";
import { handleError } from "../utils/errors";
import { loginUser } from "../utils/firebase/user_signup_login";
import { handleApiResponse } from "../utils/functions";
import { useAuthContext } from "../utils/hooks";
import { AuthTokenResponseType } from "../utils/types/utils";
import React, { useState } from "react";


/**
 * Login page
 * If the user was successfully logged in, the app
 * redirects to the main page. Otherwise, an error
 * message is displayed, with the problem that has 
 * occurred. 
 */
const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "", 
        password: "", 
    });
    const [error, setError] = useState("");
    const {login} = useAuthContext();
    const navigate = useNavigate();
    
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
            // login using Firebase Auth
            await loginUser(formData.email, formData.password);
            // obtain the token from the server
            const message = await loginUserCall(formData.email);
            const response = handleApiResponse<AuthTokenResponseType>(message, setError);
            if (response) {
                login((response as AuthTokenResponseType).authToken, formData.email);
                navigate(routes.home);
            }
        }
        catch(error: unknown){
            const errorMessage = handleError(error);
            console.log("error", error);
            setError(errorMessage.error.message);
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
                    New here? <Link to="/register">Create an account.</Link></span>
            </form>
        </section>
    );
};

export default LoginPage;
