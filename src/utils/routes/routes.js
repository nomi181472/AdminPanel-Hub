/***** Whole POS Admin Portal web application routes are defined here *****/

import { Home } from '@mui/icons-material'

const unAuthenticatedRoutes = [
    "/login",
    "/signup",
    "/forget-password",
];

const authenticatedRoutes = [
    "/",
    "/dashboard",
    "/about",
    "/contact",
];

const appRoutes = [
    {
        id: 1,
        label: 'dashboard',
        path: '/dashboard',
        icon: Home
    },

    {
        id: 2,
        label: 'about',
        path: '/about',
        icon: Home
    },

    {
        id: 3,
        label: 'contact',
        path: '/contact',
        icon: Home
    },
];

export {
    unAuthenticatedRoutes,
    authenticatedRoutes,
    appRoutes
};