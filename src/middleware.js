/***** Application middleware functionality to handle session or protected routes *****/

import { NextResponse } from 'next/server';
import { unAuthenticatedRoutes, authenticatedRoutes } from './utils/routes/routes'; // Routes...!

const isUserLoggedIn = false;

// Note: Middleware handler...!
const middleware = (req) => {
    const { pathname } = req.nextUrl;

    // Note: If user is not logged in...!
    if (!isUserLoggedIn) {
        if (authenticatedRoutes.includes(pathname)) {
            return NextResponse.redirect(new URL(unAuthenticatedRoutes[0], req?.url));
        };
    };

    // Note: If user is logged in...!
    if (isUserLoggedIn) {
        if (unAuthenticatedRoutes.includes(pathname)) {
            return NextResponse.redirect(new URL(authenticatedRoutes[0], req?.url));
        };
    };
};

export { middleware };