// Note: StatsCard component...!

import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button, Chip } from '@mui/material';

const StatsCard = () => {

    // Note: Fetching data from redux...!
    const { totalUserCount } = useSelector(({ userStates }) => { return userStates });
    // console.log("Total users: ", totalUserCount);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 3,
                bgcolor: 'white',
                borderRadius: 2,
                boxShadow: 2,
                width: '100%',
                // maxWidth: 800,
                mx: 'auto',
                marginBottom: 2
            }}
        >
            <Box>
                <Typography variant="h4" fontWeight="bold">
                    {totalUserCount ? totalUserCount : 0}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Number of users
                </Typography>
            </Box>

            <Box>
                <Typography variant="h4" fontWeight="bold">
                    32 342
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Active Users
                </Typography>
            </Box>

            <Box display="flex" alignItems="center">
                <Typography variant="h4" fontWeight="bold">
                    32
                </Typography>

                <Chip
                    label="21% up"
                    size="small"
                    sx={{
                        ml: 1,
                        bgcolor: '#E0E0E0',
                        color: 'black',
                    }}
                />

                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    New Users
                </Typography>
            </Box>

            <Button
                variant="contained"
                sx={{
                    bgcolor: 'black',
                    color: 'white',
                    textTransform: 'none',
                    '&:hover': {
                        bgcolor: 'black',
                    },
                }}
            >
                Add New User
            </Button>
        </Box>
    );
};

export default memo(StatsCard);