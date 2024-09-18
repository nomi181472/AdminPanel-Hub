// Note: AppNavBar component...!

import * as React from 'react';
import { memo, useState } from "react";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { AppBar } from '../mui-sections/mui-sections';

const AppNavBar = (props) => {
    const { openDrawer, openDrawerHandler } = props;

    // Note: Handeling states here...!
    const [anchorEl, setAnchorEl] = useState(null);

    // Note: Open and close menu's handler...!
    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <AppBar
            position="fixed"
            open={openDrawer}
        >
            <Toolbar>
                {/* Drawer Icon */}
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={openDrawerHandler}
                    edge="start"
                    sx={[
                        { mr: 2 },
                        openDrawer && { display: 'none' },
                    ]}
                >
                    <MenuIcon />
                </IconButton>

                {/* Title */}
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    POS Admin Panel
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
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My Account</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default memo(AppNavBar);