import ErrorBoundary from "@/components/ErrorBoundary";
import RootLayout from "@/components/RootLayout";
import AuthenticationProvider from "@/context/AuthenticationProvider";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import LoginPage from "./login";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <RootLayout>
            <ErrorBoundary fallback={<LoginPage />}>
                <AuthenticationProvider>
                    <Component {...pageProps} />
                </AuthenticationProvider>
            </ErrorBoundary>
        </RootLayout>
    );
}
