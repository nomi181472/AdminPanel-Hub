// Note: AppNavBar component...!

import * as React from 'react';
import { memo } from "react";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { AppBar } from '../mui-sections/mui-ections';

const AppNavBar = (props) => {
    const { openDrawer, openDrawerHandler } = props;
    // console.log("Props: ", props);

    return (
        <AppBar
            position="fixed"
            open={openDrawer}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={openDrawerHandler}
                    edge="start"
                    sx={[
                        { mr: 2, },
                        openDrawer && { display: 'none' },
                    ]}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" noWrap component="div">
                    POS Admin Panel
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default memo(AppNavBar);