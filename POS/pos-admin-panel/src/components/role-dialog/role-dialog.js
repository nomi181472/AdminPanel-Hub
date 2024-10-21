// Note: RoleDialog component...!

import * as React from 'react';
import { useState, memo } from "react";
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { customStyles } from '@/styles/styles';
import { addRole, getAllFeatures } from '@/redux/store/actions/roles-actions/roles-actions';

const RoleDialog = (props) => {
    const { open, close, roleSuccessHandler } = props;
    // console.log("Props of role dialog component: ", props);

    // Note: Handeling states here...!
    const [inputField, setInputField] = useState("");
    const [err, setErr] = useState("");

    // Note: Handeling redux here...!
    const dispatch = useDispatch();

    // Note: Clear states handler...!
    const clearStates = () => {
        setInputField("");
        setErr("");
    };

    // Note: Add role api response handler...!
    const resHandler = (res) => {
        if (res && res?.data) {
            clearStates();
            close();
            dispatch(getAllFeatures());
            roleSuccessHandler();
        };
    };

    // Note: Add role handler...!
    const addRoleHandler = () => {
        if (inputField.trim().length < 1) {
            setErr('Role is required');
            return
        };

        dispatch(addRole(inputField, resHandler));
    };

    return (
        <React.Fragment>
            <Dialog
                fullWidth
                open={open}
                disableEscapeKeyDown={true}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        close();
                    }
                }}
            >
                <DialogTitle sx={{ textTransform: customStyles.textTransformation.capitalize }}>
                    add new role
                </DialogTitle>

                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="role"
                        label="Add New Role"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={inputField}
                        onChange={(e) => setInputField(e.target.value)}
                        helperText={err}
                        error={Boolean(err)}
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={close}
                        sx={{ color: customStyles.colors.black }}
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{ color: customStyles.colors.black }}
                        onClick={addRoleHandler}
                    >
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default RoleDialog;