import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
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
            <Tag
                borderRadius='full'
                variant='solid'
                colorScheme='grey'
            >
                <TagLabel>{text}</TagLabel>
            </Tag>
        );
    }
    const handleRemoveTag = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        removeTag(text);
    };
    return (
        <Tag
            size="md"
            borderRadius='full'
            variant='solid'
            className="tag"
        >
            <TagLabel>{text}</TagLabel>
            <TagCloseButton onClick={handleRemoveTag}/>
        </Tag>
    );
};

export default CustomTag;
