import Head from "next/head";
import React from "react";

interface Props {
    children: React.ReactNode
}

const RootLayout = ({children}: Props) => {
    return (
        <>
            <Head>
                <title>Zephon</title>
                <meta name="description" content="E2EE messaging app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                {children}
            </main>
        </>
    );
};

export default RootLayout;
