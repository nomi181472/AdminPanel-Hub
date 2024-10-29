// Note: AppDrawer component...!

import * as React from 'react';
import { useState, memo } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Box, List, Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';

import { drawerWidth, DrawerHeader, Drawer } from '../mui-sections/mui-sections';
import { appRoutes } from '@/utils/routes/routes';
import ShowMessage from '@/components/toast-message/toast-message';
import messages from '@/utils/messages/messages';
import { customStyles } from '@/styles/styles';
import { logOutUser } from '@/redux/store/actions/auth-actions/auth-actions';
import { clearAllUserStates } from '@/redux/store/actions/user-actions/user-actions';
import { clearAllRolesStates } from '@/redux/store/actions/roles-actions/roles-actions';
import { clearAllActionStates } from '@/redux/store/actions/action-feature-actions/action-feature-actions';

const AppDrawer = (props) => {
    const { openDrawer, closeDrawer } = props;
    const theme = useTheme();

    // Note: Handeling states here...!
    const [states, setStates] = useState({
        showToast: false,
        message: "",
        messageStatus: "",
    });

    // Note: Handeling redux here...!
    const dispatch = useDispatch();

    // Note: Function to close show message...!
    const closeShowMessage = () => {
        setStates({
            showToast: false,
            message: "",
            messageStatus: ""
        });
    };

    // Note: Function to log out user...!.
    const logOutHandler = () => {
        setStates({
            showToast: true,
            message: "You have logged out successfully!",
            messageStatus: messages.success
        });

        setTimeout(() => {
            dispatch(logOutUser());
            dispatch(clearAllUserStates());
            dispatch(clearAllRolesStates());
            dispatch(clearAllActionStates());
        }, 3000);
    };

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    backgroundColor: customStyles.colors.black,
                    color: theme.palette.customColors._fff
                },
            }}
            variant="permanent"
            anchor="left"
            open={openDrawer}
        >

            {/* Note: Component for showing logout message */}
            <ShowMessage
                show={states.showToast}
                message={states.message}
                status={states.messageStatus}
                close={closeShowMessage}
            />

            <DrawerHeader>
                <IconButton
                    onClick={closeDrawer}
                    sx={{ color: theme.palette.customColors._fff }}
                >
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>

            <Divider sx={{ backgroundColor: theme.palette.customColors._ffffff30 }} /> {/* Semi-transparent divider */}

            <List>
                {
                    appRoutes?.map((item, index) => (
                        <Link
                            key={item?.id}
                            href={item?.path}
                            style={{ textDecoration: customStyles.textTransformation.none }}
                        >
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
                                                    textTransform: customStyles.textTransformation.capitalize
                                                }}
                                            >
                                                {item?.label}
                                            </Typography>
                                        }
                                    />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))
                }
            </List>

            <Box sx={{ flexGrow: 1 }} /> {/* Spacer to push log out at the bottom */}

            <Divider sx={{ backgroundColor: theme.palette.customColors._ffffff30 }} />

            {/* Logout Button */}
            <List>
                <Link href="#" style={{ textDecoration: customStyles.textTransformation.none }}>
                    <ListItem disablePadding>
                        <ListItemButton
                            sx={{
                                color: customStyles.colors.white,
                                transition: 'transform 0.3s ease, color 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.2)'
                                },
                                paddingLeft: openDrawer ? 6 : null
                            }}
                            onClick={logOutHandler}
                        >
                            <ListItemIcon sx={{ color: customStyles.colors.white }}>
                                <LogoutIcon />
                            </ListItemIcon>

                            <ListItemText
                                primary={
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            textTransform: customStyles.textTransformation.capitalize,
                                            fontWeight: 600,
                                            letterSpacing: 0.5,
                                            color: customStyles.colors.white
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