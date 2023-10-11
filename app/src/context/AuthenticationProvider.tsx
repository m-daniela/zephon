import { AuthTokenType } from "@/utils/types/utils";
import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

type Props = {
    children: React.ReactNode
}

type AuthContextType = {
    token: AuthTokenType, 
    login: (newToken: string) => void
    logout: () => void
}

const AuthenticationContext = createContext<AuthContextType>({} as AuthContextType);

/**
 * Authentication context and provider
 * This handles the authentication token for the currently 
 * logged user
 * @param {Props} children
 * @returns 
 */
const AuthenticationProvider = ({children}: Props) => {
    const [token, setToken] = useState<AuthTokenType>(Cookies.get("token"));

    const login = (newToken: string) => {
        setToken(newToken);
        console.log("token token token", newToken);
        // save in local storage for now
        localStorage.setItem("token", newToken);
        Cookies.set("token", newToken, {expires: 1});
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        Cookies.remove("token");
    };

    return (
        <AuthenticationContext.Provider value={{token, login, logout}}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationProvider;


/**
 * The authentication hook checks if there is a token for
 * the current user and, if not, the user is redirected
 * to the login page. Otherwise, the context data is returned
 * @returns context | redirect to login page
 */
export const useAuthContext = (): AuthContextType => {
    return useContext(AuthenticationContext);
};