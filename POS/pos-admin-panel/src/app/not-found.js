// Note: NotFound404 Page...!

"use client";

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import NotFoundAnimation from '../../public/lottie/not-found-animation.json';
import { customStyles } from '@/styles/styles';

const NotFound404 = () => {

    // Note: handeling states here...!
    const [countdown, setCountdown] = useState(3);

    // Note: Handeling navigation here...!
    const router = useRouter();

    // Note: When this component mounts then this hook will run...!
    useEffect(() => {
        // Decrement countdown every second
        const intervalId = setInterval(() => {
            setCountdown(countdown - 1);
        }, 1000);

        // When countdown reaches 0, redirect to home page
        if (countdown === 0) {
            router.push('/');
        };

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [countdown, router]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: customStyles.direction.column,
                alignItems: customStyles.alignment.center,
                justifyContent: customStyles.alignment.center,
                height: customStyles.vhSize.vh_100,
                textAlign: customStyles.alignment.center,
                padding: 2,
                backgroundColor: customStyles.colors._f5f5f5,
            }}
        >
            <Lottie
                animationData={NotFoundAnimation}
                loop
                style={{
                    height: '300px',
                    width: '300px',
                    maxWidth: customStyles.sizeInPercent.size_100,
                    maxHeight: customStyles.sizeInPercent.size_100,
                }}
            />

            <Typography variant="h4" component="h1" sx={{ mt: 2 }}>
                Oops! Page Not Found
            </Typography>

            <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
                The page you're looking for doesn't exist.
            </Typography>

            <Typography
                variant="h4"
                sx={{
                    mt: 2,
                    textTransform : customStyles.textTransformation.capitalize
                }}
            >
                {/* {countdown} */}
                {`Redirected to home screen in: ${countdown} seconds.`}
            </Typography>

            <Button
                variant="contained"
                href="/"
                sx={{
                    mt: 3,
                    color: customStyles.colors.white,
                    backgroundColor: customStyles.colors.black,
                }}
            >
                Go Back Home
            </Button>
        </Box>
    );
};

export default NotFound404;