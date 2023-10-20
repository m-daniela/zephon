import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


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
const CustomDeleteAlert: React.FC<Props> = (
    {isOpen, onClose, onDelete, message}: Props): React.JSX.Element => {

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Delete conversation?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Close
                </Button>
                <Button onClick={onDelete} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomDeleteAlert;
