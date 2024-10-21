// Note: ScreenLoader component...!

import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { Spinner } from 'react-activity';

const ScreenLoader = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                // backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: translucent background
                position: 'fixed',
                top: 80,
                left: 40,
                right: 0,
                bottom: 0,
                // zIndex: 1300, // Ensure it's above other content
            }}
        >

            {/* Note: Loader */}
            <Spinner color="black" size={32} />

            {/* Note: Loader text */}
            <Typography variant="h6" sx={{ mt: 2 }}>
                Loading...
            </Typography>
        </Box>
    );
};

export default memo(ScreenLoader);