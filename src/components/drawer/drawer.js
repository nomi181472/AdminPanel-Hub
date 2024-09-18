// Note: AppDrawer component...!

import * as React from 'react';
import { memo } from 'react';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import { appRoutes } from '@/utils/routes/routes';
import { drawerWidth, DrawerHeader } from '../mui-sections/mui-sections';

const AppDrawer = (props) => {
    const { openDrawer, closeDrawer } = props;
    const theme = useTheme();

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: theme.palette.customColors._1976d2,
                    color: theme.palette.customColors._fff
                },
            }}
            variant="persistent"
            anchor="left"
            open={openDrawer}
        >
            <DrawerHeader>
                <IconButton onClick={closeDrawer} sx={{ color: theme.palette.customColors._fff }}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>

            <Divider sx={{ backgroundColor: theme.palette.customColors._ffffff30 }} /> {/* Semi-transparent divider */}

            <List>
                {appRoutes?.map((item, index) => (
                    <Link key={item?.id} href={item?.path} style={{ textDecoration: "none" }}>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ '&:hover': { backgroundColor: theme.palette.customColors._ffffff30 } }}>
                                <ListItemIcon sx={{ color: theme.palette.customColors._fff }}>
                                    <item.icon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: theme.palette.customColors.white,
                                                fontWeight: 600,
                                                letterSpacing: 0.5,
                                                textTransform: "capitalize"
                                            }}
                                        >
                                            {item?.label}
                                        </Typography>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>

            <Box sx={{ flexGrow: 1 }} /> {/* Spacer to push log out at the bottom */}

            <Divider sx={{ backgroundColor: theme.palette.customColors._ffffff30 }} />

            {/* Logout Button */}
            <List>
                <Link href="#" style={{ textDecoration: "none" }}>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ '&:hover': { backgroundColor: theme.palette.customColors._ffffff30 } }}>
                            <ListItemIcon sx={{ color: theme.palette.customColors._fff }}>
                                <LogoutIcon />
                            </ListItemIcon>
                            
                            <ListItemText
                                primary={
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            textTransform: "capitalize",
                                            fontWeight: 600,
                                            letterSpacing: 0.5,
                                            color: theme.palette.customColors.white
                                        }}
                                    >
                                        log out
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
        </Drawer>
    );
};

export default memo(AppDrawer);