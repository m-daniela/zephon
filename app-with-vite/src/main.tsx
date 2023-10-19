import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/routing.tsx";
import AuthenticationProvider from "./context/AuthenticationProvider.tsx";
import { ChakraProvider } from "@chakra-ui/react";


ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthenticationProvider>
            {/* <ChakraProvider> */}

            <RouterProvider router={router} />

            {/* </ChakraProvider> */}
        </AuthenticationProvider>
    </React.StrictMode>,
);
