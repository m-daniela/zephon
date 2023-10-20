import React, { useState } from "react";
import { EmailIcon, AddIcon } from "@chakra-ui/icons";
import { HStack, IconButton } from "@chakra-ui/react";
import Conversations from "../conversations/Conversations";
import AddConversation from "../conversations/AddConversation";

type HeaderButtonsType = {
    [key: string]: boolean
}

/**
 * Layout component containing the conversations and 
 * add conversation component. 
 * The user can switch between these components by 
 * choosing from the icon list. 
 * @returns 
 */
const LeftSideLayout: React.FC = (): React.JSX.Element => {
    const [display, setDisplay] = useState<HeaderButtonsType>({
        conversationsButton: true,
        addConversationsButton: false
    });

    /**
     * Changes the currently displayed section.
     * OBS: I have passed in the displayId because the id of 
     * the target element was not always available. 
     * @param e event
     * @param displayId button id 
     */
    const handleDisplaySection = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>, displayId: string) => {
        e.preventDefault();
        setDisplay(state => {
            const stateCopy: HeaderButtonsType = {...state};
            for (const property in stateCopy) {
                stateCopy[property] = false;
            }
            stateCopy[displayId] = true;
            return stateCopy;
        });
    };
    return (
        <section className="left">
            <HStack className="options">
                <IconButton 
                    aria-label="Conversations" 
                    icon={<EmailIcon boxSize={25}/>} 
                    onClick={(e) => handleDisplaySection(e, "conversationsButton")}/>
                <IconButton 
                    aria-label="Add Conversation" 
                    icon={<AddIcon boxSize={20}/>} 
                    onClick={(e) => handleDisplaySection(e, "addConversationsButton")}/>
            </HStack>
            <section className="conversations add-conversation">
                {display.conversationsButton && <Conversations />}
                {display.addConversationsButton && <AddConversation />}
            </section>
        </section>
    );
};

export default LeftSideLayout;
