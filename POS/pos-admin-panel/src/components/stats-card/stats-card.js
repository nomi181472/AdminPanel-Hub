// Note: StatsCard component...!

import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import {
    Box,
    Typography,
    Chip,
    Tooltip,
    IconButton
} from '@mui/material';

import { Add } from '@mui/icons-material';
import { customStyles } from '@/styles/styles';

// Note: Roles stats card component...!
const IAMStatsCard = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 1.5,
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
                <Typography variant="h5" fontWeight="bold">
                    500
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Number of total inventories
                </Typography>
            </Box>

            <Box>
                <Typography variant="h5" fontWeight="bold">
                    02
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Total inventories update by today
                </Typography>
            </Box>

            <Box display="flex" alignItems="center">
                <Typography variant="h5" fontWeight="bold">
                    05
                </Typography>

                <Chip
                    label="2% up"
                    size="small"
                    sx={{
                        ml: 1,
                        bgcolor: '#E0E0E0',
                        color: 'black',
                    }}
                />

                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    Total inventories added by today
                </Typography>
            </Box>

            <Tooltip title="Add New Inventory">
                <IconButton
                    aria-label="add inventory"
                >
                    <Add sx={{ color: customStyles.colors.black }} />
                </IconButton>
            </Tooltip>
        </Box>
    );
};



// Note: User stats card component...!
const UserStatsCard = (props) => {
    // console.log('Props of user stats card component: ', props);
    const { funcHandler } = props;

    // Note: Fetching data from redux...!
    const { totalUserCount, usersList, newUsersCountByMonth } = useSelector(({ userStates }) => { return userStates });
    // console.log("Total users: ", totalUserCount);
    console.log("New Users Count By Month: ", newUsersCountByMonth);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 1.5,
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
                <Typography variant="h5" fontWeight="bold">
                    {totalUserCount ? totalUserCount : 0}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Number of users
                </Typography>
            </Box>

            <Box>
                <Typography variant="h5" fontWeight="bold">
                    {[...usersList].filter((item) => { return item?.isActive })?.length}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Active Users
                </Typography>
            </Box>

            <Box display="flex" alignItems="center">
                <Typography variant="h5" fontWeight="bold">
                    {newUsersCountByMonth}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    {`New User${newUsersCountByMonth > 0 ? 's' : ""}`}
                </Typography>
            </Box>

            <Tooltip title="Add User">
                <IconButton
                    aria-label="add user"
                    onClick={funcHandler}
                >
                    <Add sx={{ color: customStyles.colors.black }} />
                </IconButton>
            </Tooltip>
        </Box>
    );
};



// Note: Roles stats card component...!
const RolesStatsCard = (props) => {
    // console.log('Props of user stats card component: ', props);
    const { funcHandler } = props;

    // Note: Fetching data from redux...!
    const { roles } = useSelector(({ roleStates }) => { return roleStates });
    // console.log('Roles: ', roles);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 1.5,
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
                <Typography variant="h5" fontWeight="bold">
                    {roles?.length}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Number of roles
                </Typography>
            </Box>

            <Box>
                <Typography variant="h5" fontWeight="bold">
                    {[...roles].filter((item) => { return item?.isActive })?.length}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Active Roles
                </Typography>
            </Box>

            <Box display="flex" alignItems="center">
                <Typography variant="h5" fontWeight="bold">
                    10
                </Typography>

                <Chip
                    label="5% up"
                    size="small"
                    sx={{
                        ml: 1,
                        bgcolor: '#E0E0E0',
                        color: 'black',
                    }}
                />

                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    New Roles
                </Typography>
            </Box>

            <Tooltip title="Add New Role">
                <IconButton
                    aria-label="add role"
                    onClick={funcHandler}
                >
                    <Add sx={{ color: customStyles.colors.black }} />
                </IconButton>
            </Tooltip>
        </Box>
    );
};



// Note: RenderStats component...!
const RenderStats = (props) => {
    // console.log('Props of render stats component: ', props);
    const { statsOf, handler } = props;

    const renderStatsHandler = () => {
        if (statsOf == "iam") return <IAMStatsCard />
        else if (statsOf == "users") return <UserStatsCard funcHandler={handler} />
        else if (statsOf == "roles") return <RolesStatsCard funcHandler={handler} />
    };

    return (<> {renderStatsHandler()} </>);
};

export default memo(RenderStats);