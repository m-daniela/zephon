import React, { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
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
        e: React.MouseEvent<SVGSVGElement, MouseEvent>, displayId: string) => {
        e.preventDefault();
        console.log(e.target);
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
            <section className="options horizontal">
                <MailOutlineRoundedIcon
                    onClick={(e) => handleDisplaySection(e, "conversationsButton")}
                />
                <AddRoundedIcon 
                    onClick={(e) => handleDisplaySection(e, "addConversationsButton")}
                />
            </section>
            <section className="conversations add-conversation">
                {display.conversationsButton && <Conversations />}
                {display.addConversationsButton && <AddConversation />}
            </section>
        </section>
    );
};

export default LeftSideLayout;
