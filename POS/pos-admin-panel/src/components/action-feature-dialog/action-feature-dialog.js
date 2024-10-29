// Note: ActionFeatureDialog component...!

import React, { useState, useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    IconButton,
    Tooltip
} from '@mui/material';
import { Delete, Edit, Close, CheckCircle } from '@mui/icons-material';
import { customStyles } from '@/styles/styles';
import {
    getAllActions,
    deleteAction
} from '@/redux/store/actions/action-feature-actions/action-feature-actions';
import messages from '@/utils/messages/messages';

const ActionFeatureDialog = (props) => {
    const { open, close, rowData, displayMessageHandler } = props;
    // console.log("Props of action dialog component: ", props);

    // Handling states...!
    const [isEditMode, setIsEditMode] = useState(false);
    const [actionName, setActionName] = useState('');

    // Handling redux here...!
    const dispatch = useDispatch();

    // Note: Handle Esc key press to close the dialog...!
    const handleKeyDown = (event) => {
        if (event.key === 'Escape') close();
    };

    // Note: Delete and update API response handler...!
    const resHandler = (res) => {
        // 200:
        if (res && res?.status === 200) {
            dispatch(getAllActions());
            displayMessageHandler('Action deleted successfully', messages.success);
            close();
        }

        // Note: All other status codes:
        if (res && res?.status !== 200) {
            console.log('res: ', res);
        }
    };

    // Note: Delete action handler...!
    const handleDelete = () => {
        rowData && dispatch(deleteAction(rowData?.id, resHandler));
    };

    // Note: Edit action handler...!
    const handleEdit = () => {
        close();
        setIsEditMode(true);
        setActionName(rowData?.name);
    };

    // Note: Update action handler...!
    const handleUpdate = () => {
        close();
    };

    // Note: This action will update when close handler work...!
    useEffect(() => {
        setIsEditMode(false);
        setActionName('');
    }, [close]);

    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                onClose={close}
                onKeyDown={handleKeyDown}
            >
                <DialogTitle id="alert-dialog-title">{"What would you like to do?"}</DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please select an action: Edit or Delete.
                    </DialogContentText>

                    {/* Show TextField only when in edit mode */}
                    {isEditMode && (
                        <TextField
                            label="Action Name"
                            value={actionName}
                            onChange={(e) => setActionName(e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                    )}
                </DialogContent>

                <DialogActions>
                    {/* Show "Update" button with icon when in edit mode */}
                    {isEditMode ? (
                        <Tooltip title="Update">
                            <IconButton
                                sx={{ color: customStyles.colors.black }}
                                onClick={handleUpdate}
                                disabled={actionName.trim().length < 1}
                            >
                                <CheckCircle />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <>
                            <Tooltip title="Delete">
                                <IconButton
                                    onClick={handleDelete}
                                    color="error"
                                >
                                    <Delete />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Edit">
                                <IconButton
                                    onClick={handleEdit}
                                    sx={{ color: customStyles.colors.black }}
                                >
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                        </>
                    )}

                    {/* <Tooltip title="Cancel">
                        <IconButton
                            onClick={close}
                            color="secondary"
                            sx={{ color: customStyles.colors.black }}
                        >
                            <Close />
                        </IconButton>
                    </Tooltip> */}
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default memo(ActionFeatureDialog);