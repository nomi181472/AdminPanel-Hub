// PagesNavbar component...!

import React, { useState, memo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Paper, Tabs, Tab, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import InventoryIcon from '@mui/icons-material/Inventory';
import ActionsIcon from '@mui/icons-material/Attractions';
import { navbarRoutes } from '@/utils/routes/routes';
import { customStyles } from '@/styles/styles';

const PagesNavbar = () => {

    // Note: Handeling routing here...!
    const router = useRouter();

    // Note: Handeling states here...!
    const [selectedTab, setSelectedTab] = useState(0);

    // Note: Tab change handler...!
    const handleTabChange = (event, newValue) => {
        const newTab = navbarRoutes.find(value => value.id === newValue);
        if (newTab) {
            setSelectedTab(newValue);
            router.push(newTab.path);
        };
    };

    // Note: This hook will run when component mounts...!
    useEffect(() => {
        const currentPath = window.location.pathname;
        const currentTab = navbarRoutes.find(route => route.path === currentPath);
        if (currentTab) setSelectedTab(currentTab.id);
    }, []);

    return (
        <Paper
            elevation={3}
            sx={{
                width: customStyles.sizeInPercent.size_100,
                bgcolor: customStyles.colors.white,
                borderRadius: 0,
                marginBottom: 3
            }}
        >
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                centered
                TabIndicatorProps={{ style: { backgroundColor: 'black', height: '2px' } }}
            >
                <Tab
                    icon={<InventoryIcon sx={{ color: selectedTab === 0 ? 'black' : '#a9a9a9' }} />}
                    label={<Typography sx={{ fontSize: 12, paddingLeft: 2, color: selectedTab === 0 ? 'black' : '#a9a9a9' }}> IAM </Typography>}
                    sx={{
                        color: selectedTab === 0 ? 'black' : '#a9a9a9',
                        display: "flex",
                        flexDirection: customStyles.direction.row,
                        transition: 'transform 0.3s ease, color 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.1)',
                            color: customStyles.colors.black,
                        },
                        '& .MuiSvgIcon-root': {
                            transition: 'color 0.3s ease',
                        },
                        '&:hover .MuiSvgIcon-root': {
                            color: customStyles.colors.black
                        },
                    }}
                />

                <Tab
                    icon={<PersonIcon sx={{ color: selectedTab === 1 ? 'black' : '#a9a9a9' }} />}
                    label={<Typography sx={{ fontSize: 12, paddingLeft: 2, color: selectedTab === 1 ? 'black' : '#a9a9a9' }}> Users </Typography>}
                    sx={{
                        color: selectedTab === 1 ? 'black' : '#a9a9a9',
                        display: "flex",
                        flexDirection: customStyles.direction.row,

                        transition: 'transform 0.3s ease, color 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.1)',
                            color: customStyles.colors.black,
                        },
                        '& .MuiSvgIcon-root': {
                            transition: 'color 0.3s ease',
                        },
                        '&:hover .MuiSvgIcon-root': {
                            color: customStyles.colors.black
                        },
                    }}
                />

                <Tab
                    icon={<SecurityIcon sx={{ color: selectedTab === 2 ? 'black' : '#a9a9a9' }} />}
                    label={<Typography sx={{ fontSize: 12, paddingLeft: 2, color: selectedTab === 2 ? 'black' : '#a9a9a9' }}> Roles </Typography>}
                    sx={{
                        color: selectedTab === 2 ? 'black' : '#a9a9a9',
                        display: "flex",
                        flexDirection: customStyles.direction.row,
                        transition: 'transform 0.3s ease, color 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.1)',
                            color: customStyles.colors.black,
                        },
                        '& .MuiSvgIcon-root': {
                            transition: 'color 0.3s ease',
                        },
                        '&:hover .MuiSvgIcon-root': {
                            color: customStyles.colors.black
                        },
                    }}
                />

                <Tab
                    icon={<ActionsIcon sx={{ color: selectedTab === 3 ? 'black' : '#a9a9a9' }} />}
                    label={<Typography sx={{ fontSize: 12, paddingLeft: 2, color: selectedTab === 3 ? 'black' : '#a9a9a9' }}> Actions </Typography>}
                    sx={{
                        color: selectedTab === 3 ? 'black' : '#a9a9a9',
                        display: "flex",
                        flexDirection: customStyles.direction.row,

                        transition: 'transform 0.3s ease, color 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.1)',
                            color: customStyles.colors.black,
                        },
                        '& .MuiSvgIcon-root': {
                            transition: 'color 0.3s ease',
                        },
                        '&:hover .MuiSvgIcon-root': {
                            color: customStyles.colors.black
                        },
                    }}
                />
            </Tabs>
        </Paper>
    );
};

export default memo(PagesNavbar);