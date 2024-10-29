// Note: AddUserDialog component...!

import * as React from 'react';
import { memo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Checkbox,
    FormControlLabel,
    Box,
    Grid,
    Typography,
    Dialog,
    InputAdornment,
    IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, Save, Delete, Close, CheckCircle } from "@mui/icons-material";
import { createUser, fetchAllUsers, getTotalUsersCount } from '@/redux/store/actions/user-actions/user-actions';
import { customStyles } from '@/styles/styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const AddUserDialog = (props) => {
    // console.log("Props of add user dialog component: ", props);
    const { open, close, userSuccessHandler } = props;

    // Note: Handeling states here...!
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: '',
        showPassword: false,
        showConfirmPassword: false,
        roles: {}
    });
    // Note: State to store validation errors
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: ''
    });

    // Note: Handeling redux here...!
    const dispatch = useDispatch();

    // Note: Fetching data from redux...!
    const { roles } = useSelector(({ roleStates }) => { return roleStates });
    // console.log('Roles: ', roles);

    // Note: Clear states handler...!
    const clearStates = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            userType: '',
            showPassword: false,
            showConfirmPassword: false,
            roles: {}
        });
        setErrors({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            userType: '',
            roles: ''
        });
    };

    // Note: Form on change handler...!
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Note: Form on change handler for check boxes...!
    const handleRoleChange = (roleId) => {
        setFormData({
            ...formData,
            roles: {
                ...formData.roles,
                [roleId]: !formData.roles[roleId]
            }
        });

        // Reset role error when at least one role is selected
        const selectedRoles = Object.keys(formData.roles).filter(roleId => formData.roles[roleId]);
        if (selectedRoles.length > 0) {
            setErrors({ ...errors, roles: '' });
        }
    };

    // Function to validate form inputs
    const validateForm = () => {
        const newErrors = {};
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;

        if (formData.name.trim().length < 1) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.match(isEmailValid)) {
            newErrors.email = 'Invalid Email Address';
        }

        if (!formData.password.match(passwordRegex)) {
            newErrors.password = 'Password is required';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.userType) {
            newErrors.userType = 'User Type is required';
        }

        // Check if at least one role is selected
        const selectedRoles = Object.keys(formData.roles).filter(roleId => formData.roles[roleId]);
        if (selectedRoles.length === 0) {
            newErrors.roles = 'Please select at least one role';
        }

        setErrors(newErrors);

        // Return false if there are any errors
        return Object.keys(newErrors).length === 0;
    };

    // Note: Api response handler...!
    const resHandler = (res) => {
        if (res?.data) {
            dispatch(fetchAllUsers()); // Note: For updating data in real time...!
            dispatch(getTotalUsersCount()); // Note: For updating data in real time...!
            clearStates(); // Note: Flor clearing states...!
            close(); // Note: To close user creation dialog box...!
            userSuccessHandler(); // Note: For showing message that user has been created successfully.
        };
    };

    // Note: Function to save user...!
    const saveUserHandler = () => {

        // Note: Validate form before saving
        if (!validateForm()) {
            return;
        };

        // Filter the roles object to include only the checked roles (those with `true` value)
        const selectedRoles = Object.keys(formData.roles).filter(roleId => formData.roles[roleId]);

        // Prepare the final data object with selected roles
        const finalFormData = {
            name: formData?.name,
            email: formData?.email,
            password: formData?.password,
            confirmedPassword: formData?.confirmPassword,
            userType: formData?.userType,
            roleIds: selectedRoles,
            isRefreshTokenRevokable: true,
            expiryDate: "2024-10-11T13:38:55.629Z",
        };

        finalFormData && dispatch(createUser(finalFormData, resHandler));
    };

    return (
        <BootstrapDialog
            aria-labelledby="customized-dialog-title"
            open={open}
            disableEscapeKeyDown={true}
            onClose={() => {
                close();
                clearStates();
            }}
        >
            <Box sx={{ p: 4, border: '1px solid #e0e0e0', borderRadius: 4, maxWidth: '600px', margin: 'auto' }}>

                {/* Note: Header section */}
                <Typography variant="h6" gutterBottom>
                    Add User
                </Typography>

                {/* Note: Form fields */}
                <Grid container spacing={3}>

                    {/* Note: Name field */}
                    <Grid item xs={6}>
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            placeholder="Fill in the name"
                            size="small"
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                        />
                    </Grid>

                    {/* Note: Password field */}
                    <Grid item xs={6}>
                        <TextField
                            label="Password"
                            name="password"
                            type={formData.showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            placeholder="Fill in the password"
                            size="small"
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setFormData({ ...formData, showPassword: !formData.showPassword })}
                                            edge="end"
                                        >
                                            {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Note: Email field */}
                    <Grid item xs={6}>
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            placeholder="Fill in the email"
                            size="small"
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                        />
                    </Grid>

                    {/* Note: Confirm password field */}
                    <Grid item xs={6}>
                        <TextField
                            label="Confirm Password"
                            name="confirmPassword"
                            type={formData.showConfirmPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            placeholder="Re-enter your password"
                            size="small"
                            error={Boolean(errors.confirmPassword)}  // Show error state
                            helperText={errors.confirmPassword}  // Show error message
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setFormData({ ...formData, showConfirmPassword: !formData.showConfirmPassword })}
                                            edge="end"
                                        >
                                            {formData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Note: Types dropdown */}
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="user-type-label">
                                User Type
                            </InputLabel>

                            <Select
                                labelId="user-type-label"
                                label="User Type"
                                name="userType"
                                value={formData.userType}
                                onChange={handleInputChange}
                                size='medium'
                            >
                                <MenuItem value="" disabled>
                                    <em>Select User Type</em>
                                </MenuItem>
                                <MenuItem value="Employee">Employee</MenuItem>
                            </Select>

                            {/* Note: Error message for dropdown */}
                            {
                                errors.userType && (
                                    <Typography variant="caption" color="error">
                                        {errors.userType}
                                    </Typography>
                                )
                            }
                        </FormControl>
                    </Grid>

                    {/* Note: Roles section */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            Assign Roles
                        </Typography>

                        <Box
                            display="flex"
                            flexDirection="column"
                            sx={{ maxHeight: 200, overflowY: 'auto' }}
                        >
                            {
                                roles.map((role) => (
                                    <FormControlLabel
                                        key={role.roleId}
                                        control={
                                            <Checkbox
                                                checked={formData.roles[role.roleId] || false}
                                                onChange={() => handleRoleChange(role.roleId)}
                                                name={role.roleId}
                                            />
                                        }
                                        label={role.roleName}
                                    />
                                ))
                            }
                        </Box>

                        {/* Display error message if no roles selected */}
                        {errors.roles && (
                            <Typography variant="caption" color="error">
                                {errors.roles}
                            </Typography>
                        )}
                    </Grid>

                    {/* Note: Button sections */}

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton
                            sx={{ color: customStyles.colors.black }}
                            onClick={() => {
                                close();
                                clearStates();
                            }}
                        >
                            <Close />
                        </IconButton>

                        <IconButton
                            sx={{ color: customStyles.colors.black }}
                            onClick={saveUserHandler}
                        >
                            <CheckCircle />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </BootstrapDialog>
    );
};

export default memo(AddUserDialog);