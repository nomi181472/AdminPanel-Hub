// Note: AppNavBar component...!

import * as React from 'react';
import { memo, useState } from "react";
import { useSelector } from 'react-redux';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';

import { AppBar } from '../mui-sections/mui-sections';
import { customStyles } from '@/styles/styles';

import styles from "./appbar.module.css";

const AppNavBar = (props) => {
    const { openDrawer, openDrawerHandler } = props;

    // Note: Handeling states here...!
    const [anchorEl, setAnchorEl] = useState(null);
    const unreadNotification = 17;

    // Note: Fetching data from redux...!
    const { authenticatedUser } = useSelector(({ authStates }) => { return authStates });
    // console.log("User: ", authenticatedUser);

    // Note: Open and close menu's handler...!
    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <AppBar
            position="fixed"
            open={openDrawer}
            sx={{
                backgroundColor: customStyles.colors.black
            }}
        >
            <Toolbar>
                {/* Drawer Icon */}
                <IconButton
                    aria-label="open drawer"
                    onClick={openDrawerHandler}
                    edge="start"
                    sx={[
                        { mr: 2 },
                        openDrawer && { display: 'none' },
                    ]}
                >
                    <MenuIcon sx={{ color: customStyles.colors.white }} />
                </IconButton>

                {/* Title */}
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, color: customStyles.colors.white }}
                >
                    POS Admin Panel
                </Typography>

                {/* Username */}
                <Typography
                    variant="body1"
                    component="div"
                    sx={{
                        color: customStyles.colors.white,
                        marginRight: 2,
                        display: { xs: 'none', sm: 'block' }, // Hide on small screens
                    }}
                >
                    {authenticatedUser?.name}
                </Typography>

                {/* User Icon with Dropdown */}
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>

                {/* Notification icon */}
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={unreadNotification} color="error">
                        <NotificationsIcon className={unreadNotification > 0 ? styles.animateNotification : ''} />
                    </Badge>
                </IconButton>

                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        My Account
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default memo(AppNavBar);