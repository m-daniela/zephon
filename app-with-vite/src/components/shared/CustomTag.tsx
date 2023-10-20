import Chip from "@mui/material/Chip";
import React from "react";

type Props = {
    text: string, 
    removeTag?: (text: string) => void
}

/**
 * Custom tag component. 
 * Displays the given text in a Tag component.
 * If a removeTag method was passed, then the delete
 * icon will be also attached to the component.
 * @param {Props} props
 * @returns 
 */
const CustomTag: React.FC<Props> = ({text, removeTag}: Props): React.JSX.Element => {
    if (!removeTag) {
        return (
            <Chip label={text} variant="outlined" />
        );
    }
    const handleRemoveTag = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        removeTag(text);
    };
    return (
        <Chip label={text} variant="outlined" onDelete={handleRemoveTag} />
    );
};

export default CustomTag;
