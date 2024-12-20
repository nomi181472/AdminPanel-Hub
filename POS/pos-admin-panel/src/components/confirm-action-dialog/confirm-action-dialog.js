// Note: ConfirmActionDialog component...!

import React, { useState, useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    IconButton,
    Tooltip
} from '@mui/material';
import { Delete, Edit, Close, Done } from '@mui/icons-material';
import { customStyles } from '@/styles/styles';
import {
    getAllFeatures,
    deleteRole,
    updateRole
} from '@/redux/store/actions/roles-actions/roles-actions';

const ConfirmActionDialog = (props) => {
    const { open, close, rowData, roleSuccess } = props;
    // console.log("Props of action dialog component: ", props);

    // Note: Handling redux here...!
    const dispatch = useDispatch();

    // Note: Handling states here...!
    const [isEditMode, setIsEditMode] = useState(false);
    const [roleName, setRoleName] = useState('');

    // Note: Handle Esc key press to close the dialog...!
    const handleKeyDown = (event) => {
        if (event.key === 'Escape') close();
    };

    // Note: Delete role API response handler...!
    const delResHandler = (res) => {
        // 200:
        if (res && res?.status === 200) {
            dispatch(getAllFeatures());
            roleSuccess("200", "Role deleted successfully");
            close();
        };

        // 400:
        if (res && res?.status !== 200) {
            roleSuccess("400", res?.data?.message);
            close();
        };
    };

    // Note: Delete role handler...!
    const handleDelete = () => {
        const deleteRow = { roleId: rowData?.id };
        deleteRow && dispatch(deleteRole(deleteRow, delResHandler));
    };

    // Note: Delete role API response handler...!
    const updateResHandler = (res) => {
        // 200:
        if (res && res?.status === 200) {
            dispatch(getAllFeatures());
            roleSuccess("200", "Role updated successfully");
            close();
        };

        // 400:
        if (res && res?.status !== 200) {
            roleSuccess("400", res?.data?.message);
            close();
        };
    };


    // Note: Edit action - show input field...!
    const handleEdit = () => {
        setIsEditMode(true);
        setRoleName(rowData?.name);
    };

    // Handle role name update
    const handleUpdate = () => {
        const updateRoleData = {
            roleId: rowData?.id,
            roleName: roleName
        };
        updateRoleData && dispatch(updateRole(updateRoleData, updateResHandler));
    };

    // Note: THis hook will run when close handler run...!
    useEffect(() => {
        setIsEditMode(false);
        setRoleName("");
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
                            label="Role Name"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                    )}
                </DialogContent>

                <DialogActions>
                    {/* Show "Update" button when in edit mode */}
                    {isEditMode ? (
                        <Tooltip title="Update">
                            <IconButton
                                onClick={handleUpdate}
                                disabled={roleName.trim().length < 1}
                                sx={{ color: customStyles.colors.black }}
                            >
                                <Done />
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
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default memo(ConfirmActionDialog);