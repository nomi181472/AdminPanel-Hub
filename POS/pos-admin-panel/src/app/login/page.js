// Note: LogIn Page / Screen...!

"use client";

import * as React from 'react';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setCookie } from "cookies-next";
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Lottie from 'lottie-react';
import { Spinner } from 'react-activity';

import styles from "./login.module.css";
import AuthBGLottie from "../../../public/lottie/auth-bg-animation.json";
import messages from '@/utils/messages/messages';
import ShowMessage from '@/components/toast-message/toast-message';
import Loader from '@/components/loader/loader';
import { logInUser } from '@/redux/store/actions/auth-actions/auth-actions';
import { customStyles } from '@/styles/styles';

const LogIn = () => {

    const [formStates, setFormStates] = useState({
        email: "",
        password: "",
        loader: false,
        showPassword: false,
        showToast: false,
        message: "",
        messageStatus: "",
    });

    const dispatch = useDispatch();

    const handleClickShowPassword = () => setFormStates({ ...formStates, showPassword: !formStates.showPassword });

    const clearStates = () => {
        setFormStates({
            email: "",
            password: "",
            loader: false,
            showPassword: false,
            showToast: false,
            message: "",
            messageStatus: "",
        });
    };

    const closeShowMessage = () => {
        setFormStates({
            ...formStates,
            showToast: false,
            message: "",
            messageStatus: ""
        });
    };

    const resHandler = (res) => {
        if (res && res?.message == "Network Error") {
            setFormStates({
                ...formStates,
                loader: false,
                showToast: true,
                message: "Server is not working, Please try again later!",
                messageStatus: messages.error
            });
        }

        else if (res && !res?.status?.toString().startsWith("2")) {
            setFormStates({
                ...formStates,
                loader: false,
                showToast: true,
                message: res?.data?.message,
                messageStatus: messages.error
            });
        }

        else {
            setFormStates({
                ...formStates,
                showToast: true,
                message: "You have logged in successfully",
                messageStatus: messages.success
            });

            setTimeout(() => {
                localStorage.setItem("AuthToken", JSON.stringify(res?.data?.data?.token));
                setCookie('UserAuthenticated', true);
                clearStates();
                window.location.reload();
            }, 3000);
        };
    };

    const logInHandler = () => {
        try {
            const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!formStates.email.match(isEmailValid)) throw "Email is required or Invalid email address";
            else if (formStates.password.trim().length < 6) throw "Password length should be greater than 6";

            else {
                setFormStates({ ...formStates, loader: true });
                const formDataClone = { email: formStates.email, password: formStates.password };
                dispatch(logInUser(formDataClone, resHandler));
            };
        }

        catch (error) {
            if (error) {
                setFormStates({
                    ...formStates,
                    showToast: true,
                    message: error,
                    messageStatus: messages.warning
                });
            };
        };
    };

    // Note: Function to convert hex to RGBA...!
    const hexToRGBA = (hex) => {
        // console.log("Hex code: ", hex);

        let r = 0, g = 0, b = 0, a = 1;

        // Note: If color has 3 digits (e.g. #fff)
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        }

        // Note: If color has 6 digits (e.g. #ff5733)
        else if (hex.length === 7) {
            r = parseInt(hex[1] + hex[2], 16);
            g = parseInt(hex[3] + hex[4], 16);
            b = parseInt(hex[5] + hex[6], 16);
        }

        // Note: If hex code has an alpha value (e.g. rgba(255, 0, 0, 0.5))
        else if (hex.length === 9) {
            r = parseInt(hex[1] + hex[2], 16);
            g = parseInt(hex[3] + hex[4], 16);
            b = parseInt(hex[5] + hex[6], 16);
            a = parseInt(hex[7] + hex[8], 16) / 255;
        };

        return [r / 255, g / 255, b / 255, a]; // Note: Convert to RGBA...!
    };

    // Note: Function to detect all colors...!
    const findAllColors = (obj, colorSet = new Set()) => {
        if (typeof obj !== "object" || obj === null) return;

        for (const key in obj) {
            if (key === "c" && obj[key].k) {
                colorSet.add(JSON.stringify(obj[key].k)); // Note: Add colors as strings...!
            }

            else if (typeof obj[key] === "object") {
                findAllColors(obj[key], colorSet); // Note: Recurse call...!
            };
        };

        return colorSet;
    };

    // Note: Function to replace all colors...!
    const replaceAllColors = (obj, toColor) => {
        if (typeof obj !== "object" || obj === null) return;

        for (const key in obj) {
            if (key === "c" && obj[key].k) {
                obj[key].k = toColor; // Note: Replace color...!
            }

            else if (typeof obj[key] === "object") {
                replaceAllColors(obj[key], toColor); // Note: Recurse call...!
            };
        };
    };

    // Note: Convert hex color to RGBA...!
    const newColor = hexToRGBA("#466573"); // Note: Example color...!

    // Note: Detect colors and replace them...!
    const detectedColors = findAllColors(AuthBGLottie);
    // console.log("Detected Colors:", [...detectedColors]); // Note: Log all colors...!
    replaceAllColors(AuthBGLottie, newColor); // Replace with your required color...!

    return (
        <div className={styles.authMainContainer}>

            <ShowMessage
                show={formStates.showToast}
                message={formStates.message}
                status={formStates.messageStatus}
                close={closeShowMessage}
            />

            {/* Lottie Animation as background */}
            <div className={styles.lottieBackground}>
                <Lottie
                    animationData={AuthBGLottie}
                    loop={true}
                    style={{
                        width: customStyles.sizeInPercent.size_100,
                        height: customStyles.sizeInPercent.size_100
                    }}
                />
            </div>

            <Container
                component="main"
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: customStyles.alignment.center,
                    alignItems: customStyles.alignment.center,
                    position: customStyles.position.relative,
                    zIndex: 1
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: customStyles.direction.column,
                        alignItems: customStyles.alignment.center,
                        backgroundColor: customStyles.colors.white,
                        padding: { xs: 2, sm: 4 },
                        borderRadius: 2,
                        boxShadow: 3,
                        opacity: 0.9,
                        width: { xs: '100%', sm: '550px' }
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: customStyles.colors.black }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Log In
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formStates.email}
                            onChange={(e) => setFormStates({ ...formStates, email: e.target.value })}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={formStates.showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            value={formStates.password}
                            onChange={(e) => setFormStates({ ...formStates, password: e.target.value })}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {formStates.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: customStyles.colors.black, py: 1.5 }}
                            onClick={logInHandler}
                            disabled={formStates.loader}
                        >
                            {formStates.loader ? <Spinner color={customStyles.colors.white} size={15} /> : "Sign In"}
                        </Button>

                        <Grid container justifyContent="flex-end">
                            <Grid item xs="auto">
                                <Link
                                    href="/forget-password"
                                    passHref
                                >
                                    <Typography variant="body2">
                                        Forgot password?
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default LogIn;