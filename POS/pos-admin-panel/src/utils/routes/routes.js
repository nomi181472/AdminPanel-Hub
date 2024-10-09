/***** Whole POS Admin Portal web application routes are defined here *****/

import { Home } from '@mui/icons-material';
import InventoryAccessManagementIcon from '@mui/icons-material/AdminPanelSettings';
import UsersIcon from '@mui/icons-material/People';
import RolesIcon from '@mui/icons-material/Api';
import ResourcesIcon from '@mui/icons-material/Layers';
import PermissionsIcon from '@mui/icons-material/Badge';

const unAuthenticatedRoutes = [
    "/login",
    "/signup",
    "/forget-password",
];

const authenticatedRoutes = [
    "/",
    "/dashboard",
    "/inventory-access-management",
    "/users",
    "/roles",
];

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
];

const navbarRoutes = [
    {
        id: 0,
        label: 'users',
        path: authenticatedRoutes[3],
        icon: UsersIcon
    },

    {
        id: 1,
        label: 'roles',
        path: authenticatedRoutes[4],
        icon: RolesIcon
    },

    {
        id: 2,
        label: 'resources',
        path: "/",
        icon: ResourcesIcon
    },

    {
        id: 3,
        label: 'permissions',
        path: "/",
        icon: PermissionsIcon
    },
];

export {
    unAuthenticatedRoutes,
    authenticatedRoutes,
    appRoutes,
    navbarRoutes
};