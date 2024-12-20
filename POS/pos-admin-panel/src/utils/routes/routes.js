/***** Whole POS Admin Portal web application routes are defined here *****/

import { Home } from '@mui/icons-material';
import InventoryAccessManagementIcon from '@mui/icons-material/AdminPanelSettings';
import UsersIcon from '@mui/icons-material/People';
import RolesIcon from '@mui/icons-material/Api';
import InventoryIcon from '@mui/icons-material/Inventory';
import ActionsIcon from '@mui/icons-material/Attractions';

// Note: Unauthenticated routes / files...!
const unAuthenticatedRoutes = [
    "/login",
    "/signup",
    "/forget-password",
];

// Note: Authenticated routes / files...!
const authenticatedRoutes = [
    "/",
    "/dashboard",
    "/inventory-access-management",
    "/users",
    "/roles",
    "/inventory",
    "/actions"
];

// Note: Application routes...!
const appRoutes = [
    {
        id: 1,
        label: 'dashboard',
        path: authenticatedRoutes[1],
        icon: Home
    },

    {
        id: 2,
        label: 'IAM',
        path: authenticatedRoutes[2],
        icon: InventoryAccessManagementIcon
    },

    {
        id: 3,
        label: 'Inventory',
        path: authenticatedRoutes[5],
        icon: InventoryIcon
    },
];

// Note: Pages navbar routes...!
const navbarRoutes = [
    {
        id: 0,
        label: 'Inventory Access Management',
        path: authenticatedRoutes[2],
        icon: InventoryAccessManagementIcon
    },

    {
        id: 1,
        label: 'users',
        path: authenticatedRoutes[3],
        icon: UsersIcon
    },

    {
        id: 2,
        label: 'roles',
        path: authenticatedRoutes[4],
        icon: RolesIcon
    },

    {
        id: 3,
        label: 'actions',
        path: authenticatedRoutes[6],
        icon: ActionsIcon
    },
];

export {
    unAuthenticatedRoutes,
    authenticatedRoutes,
    appRoutes,
    navbarRoutes
};