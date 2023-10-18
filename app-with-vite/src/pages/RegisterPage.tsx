import { useNavigate } from "react-router";
import { registerUserCall } from "../utils/apiCalls/user_operations";
import { errorsToMessage, routes } from "../utils/constants";
import { handleError } from "../utils/errors";
import { registerUser } from "../utils/firebase/user_signup_login";
import { handleApiResponse } from "../utils/functions";
import { useAuthContext } from "../utils/hooks";
import { PasswordValidator } from "../utils/password_validator";
import { UserType } from "../utils/types/user_types";
import { AuthTokenResponseType } from "../utils/types/utils";
import React, { useState } from "react";
import { Link } from "react-router-dom";


/**
 * Registration page
 * ..returns 
 */
const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "", 
        displayName: "",
        password: "", 
        retypePassword: "", 
    });
    const [error, setError] = useState("");
    const {login} = useAuthContext();
    const navigate = useNavigate();
    const passwordValidator = new PasswordValidator();

    // useEffect(() => {
    //     if (token) {
    //         navigate(routes.home);
    //     }
    // }, [token, navigate]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name: string = e.target.name;
        const value: string = e.target.value;
        setFormData({
            ...formData, 
            [name]: value
        });
        if (name === "password") {
            setError(passwordValidator.validate(value).getValidationMessage());
        }
    };

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.password !== formData.retypePassword){
            setError(errorsToMessage["auth/matching-passwords"]);
            return;
        }
        try{
            // register a new user using Firebase Auth
            await registerUser(formData.email, formData.password);
            // obtain the token from the server
            const message = await registerUserCall({
                email: formData.email, 
                displayName: formData.displayName
            } as UserType);
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
                    Already registered? <Link to={routes.login}>Login here</Link></span>
            </form>
        </section>
    );
};

export default RegisterPage;
