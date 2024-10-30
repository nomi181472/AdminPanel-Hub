// Note: UpdateUserDialog component...!

import * as React from 'react';
import { memo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { TextField, IconButton, Box, Grid, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { customStyles } from '@/styles/styles';
import { updateUser } from '@/redux/store/actions/user-actions/user-actions';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const UpdateUserDialog = (props) => {
    const { open, close, rowData, apiResHandler } = props;

    // Handling States
    const [newName, setNewName] = useState("");

    // Handling redux
    const dispatch = useDispatch();

    // Clear states handler
    const clearStates = () => {
        setNewName("");
    };

    // Update API response handler
    const resHandler = (res, message) => {
        apiResHandler(res, message);
        close();
        clearStates();
    };

    // Function to update user
    const updateUserHandler = () => {
        const newData = {
            userId: rowData?.userId,
            email: rowData?.email,
            name: newName
        };

        newData && dispatch(updateUser(newData, resHandler));
    };

    // This hook will run when rowData changes
    useEffect(() => {
        setNewName(rowData?.name);
    }, [rowData]);

    return (
        <BootstrapDialog
            aria-labelledby="simple-dialog-title"
            open={open}
            // disableEscapeKeyDown={true}
            onClose={() => {
                close();
                clearStates();
            }}
        >
            <Box sx={{ p: 4, border: '1px solid #e0e0e0', borderRadius: 4, maxWidth: '500px', margin: 'auto' }}>
                {/* Dialog Header */}
                <Typography variant="h6" gutterBottom>
                    Update User
                </Typography>

                {/* Form fields */}
                <Grid container spacing={3}>
                    {/* Name Field */}
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            name="name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            fullWidth
                            variant="outlined"
                            placeholder="Update Name"
                            size="small"
                        />
                    </Grid>

                    {/* ID Field (Disabled) */}
                    <Grid item xs={12}>
                        <TextField
                            label="ID"
                            name="id"
                            value={rowData?.userId}
                            disabled
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>

                    {/* Icon Button Section */}
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton
                            sx={{ color: customStyles.colors.black }}
                            onClick={updateUserHandler}
                            disabled={newName?.trim().length < 1}
                        >
                            <CheckCircleIcon sx={{ color: customStyles.colors.black }} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </BootstrapDialog>
    );
};

export default memo(UpdateUserDialog);