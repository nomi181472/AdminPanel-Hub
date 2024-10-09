/***** Note: All auth related action functions are defined here *****/

import { deleteCookie } from "cookies-next";
import instance from "@/api/axios/axios";
import apiCallMethods from "@/api/api-methods/api-methods";
import { LOG_IN_USER, LOG_OUT_USER } from "../../reducers/auth-reducer/auth-reducer";

// Note: Action function to log in user...!
const logInUser = (userData, resHandler) => {
    return async (dispatch) => {
        // console.log('User data: ', userData);

        try {
            const response = await instance({
                method: apiCallMethods.post,
                url: process.env.NEXT_PUBLIC_AUTH_API_LOGIN,
                data: userData
            });
            // console.log("Api res: ", response);

            const { status, data } = response;
            resHandler(response)

            dispatch({
                type: LOG_IN_USER,
                payload: data?.data
            });
        }

        catch (error) {
            console.log('Something went wrong while log in api integration: ', error);
            if (error?.message == "Network Error") resHandler(error);
            else {
                const errRes = error?.response;
                resHandler(errRes);
            };
        };
    };
};

// Note: Action function to log out user...!
const logOutUser = () => {
    return (dispatch) => {
        // console.log('You have logged out successfully!');

        dispatch({
            type: LOG_OUT_USER
        });

        localStorage.removeItem("AuthToken"); // Note: Removing the auth token from local storage...!
        deleteCookie("UserAuthenticated"); // Note: Set user authentication status in cookies...!
        window.location.reload(); // Note: Refresh the page...!
    };
};

export {
    logInUser,
    logOutUser
};