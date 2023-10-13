import { 
    AlertDialog,
    AlertDialogBody, 
    AlertDialogContent, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogOverlay, 
    Button } from "@chakra-ui/react";
import React from "react";

type Props = {
    isOpen: boolean,
    onClose: () => void, 
    onDelete: () => void,
    message: string
}

/**
 * Custom delete alert.
 * Displays an alert before performing the delete operation, 
 * triggered by the user. 
 * @param {Props}
 * @returns 
 */
const CustomDeleteAlert = ({isOpen, onClose, onDelete, message}: Props): React.JSX.Element => {
    const cancelRef = React.useRef(null);

    return (
        
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            colorScheme="white"
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete Conversation
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {message}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={onDelete} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        
    );
};

export default CustomDeleteAlert;
