import { AuthTokenType } from "../utils/types/utils";
import React, { createContext, useState } from "react";
import Cookies from "js-cookie";

type Props = {
    children: React.ReactNode
}

export type AuthContextType = {
    token: AuthTokenType, 
    email: string,
    login: (newToken: string, userEmail: string) => void
    logout: () => void, 
}

export const AuthenticationContext = createContext<AuthContextType>({} as AuthContextType);

/**
 * Authentication context and provider
 * This handles the authentication token for the currently 
 * logged user
 * @param {Props} children
 * @returns 
 */
const AuthenticationProvider = ({children}: Props) => {
    // TODO: cleanup the states
    const [token, setToken] = useState<AuthTokenType>(Cookies.get("token"));
    const [email, setEmail] = useState<string>(Cookies.get("email") ?? "");

    const login = (newToken: string, userEmail: string) => {
        setToken(newToken);
        setEmail(userEmail);
        // save in local storage for now
        localStorage.setItem("token", newToken);
        Cookies.set("token", newToken, {expires: 1});
        Cookies.set("email", userEmail, {expires: 1});
    };

    const logout = () => {
        setToken(null);
        setEmail("");
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        Cookies.remove("token");
        Cookies.set("email", "");
    };

    return (
        <AuthenticationContext.Provider value={{token, email, login, logout}}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationProvider;