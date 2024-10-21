// Note: UpdateUserDialog component...!

import * as React from 'react';
import { memo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
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
    // console.log("Props of update user dialog component: ", props);

    // Note: Handling States here
    const [newName, setNewName] = useState("");

    // Note: Handeling redux here...!
    const dispatch = useDispatch();

    // Note: Clear states handler
    const clearStates = () => {
        setNewName("");
    };

    // Note: Update api response handler...!
    const resHandler = (res, message) => {
        apiResHandler(res, message);
        close();
        clearStates();
    };

    // Note: Funtion to update user...!
    const updateUserHandler = () => {
        const newData = {
            userId: rowData?.userId,
            email: rowData?.email,
            name: newName
        };

        newData && dispatch(updateUser(newData, resHandler));
    };

    // Note: This hook will run when rowData will run...!
    useEffect(() => {
        setNewName(rowData?.name);
    }, [rowData]);

    return (
        <React.Fragment>
            <BootstrapDialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={() => {
                    close();
                    clearStates();
                }}
                disableEscapeKeyDown={true}
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
                                // onChange={(e) => { formData({ ...formData, id: e.target.value }) }}
                                disabled
                                fullWidth
                                variant="outlined"
                                size="small"
                            />
                        </Grid>

                        {/* Button Section */}
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: customStyles.colors.black }}
                                onClick={() => {
                                    close();
                                    clearStates()
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="contained"
                                sx={{ backgroundColor: customStyles.colors.black }}
                                onClick={updateUserHandler}
                                disabled={newName?.trim().length < 1}
                            >
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </BootstrapDialog>
        </React.Fragment>
    );
};

export default memo(UpdateUserDialog);