import React from "react";
import { Spinner } from "@chakra-ui/react";

const MessagesLayout: React.FC = () => {
    return (
        <section className="messages">
            <p>messages</p>
            <Spinner size="lg" />
        </section>
    );
};

export default MessagesLayout;
