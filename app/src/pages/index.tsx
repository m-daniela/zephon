import LeftSideLayout from "@/components/leftSide/LeftSideLayout";
import { useAuthContext } from "@/context/AuthenticationProvider";
import { routes } from "@/utils/constants";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

/**  
 * OBS The home page will not be displayed for now
 * The user is redirected to the Login page
*/
export default function Home() {
    const {token, logout} = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push(routes.login);
        }
    }, [token, router]);
    
    return (
        <section>
            <LeftSideLayout />
            <button onClick={logout}>Log out</button>
        </section>
    );
}
