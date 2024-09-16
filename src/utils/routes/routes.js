/***** Whole POS Admin Portal web application routes are defined here *****/

const unAuthenticatedRoutes = [
    "/login",
    "/signup",
    "/forget-password",
];

const authenticatedRoutes = [
    "/",
    "/dashboard"
];

export { unAuthenticatedRoutes, authenticatedRoutes };