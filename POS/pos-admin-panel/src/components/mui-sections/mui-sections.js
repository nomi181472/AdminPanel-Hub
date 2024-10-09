// Note: AppHeader section...!

import { styled } from '@mui/material/styles';
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { TableCell, tableCellClasses, TableRow } from '@mui/material';
import { customStyles } from '@/styles/styles';

const drawerWidth = 250;

// Note: AppBar section...!
const AppBar = styled(
    MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
}
)
    (({ theme }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    width: `calc(100% - ${drawerWidth}px)`,
                    marginLeft: drawerWidth,
                    transition: theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                },
            },
        ],
    }));

// Note: Main / container section...! 
const Main = styled(
    'main', { shouldForwardProp: (prop) => prop !== 'open' })
    (
        ({ theme }) => ({
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: `-${drawerWidth}px`,
            variants: [
                {
                    props: ({ open }) => open,
                    style: {
                        transition: theme.transitions.create('margin', {
                            easing: theme.transitions.easing.easeOut,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        marginLeft: 0,
                    },
                },
            ],
        }),
    );

// Note: Styling when drawer open...!
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

// Note: Styling when drawer close...!
const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

// Note: Drawer header section...!
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

// Note: Drawet section...!
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

// Note: Table row section...!
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// Note: Table cell section...!
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: customStyles.colors.black,
        textTransform: "capitalize",
        fontWeight: "bold"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: customStyles.colors.black,
    },
}));

export {
    AppBar,
    Main,
    drawerWidth,
    DrawerHeader,
    Drawer,
    StyledTableRow,
    StyledTableCell
};