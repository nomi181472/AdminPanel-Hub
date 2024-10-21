/***** Note: All user related action functions are defined here *****/

import instance from "@/api/axios/axios";
import apiCallMethods from "@/api/api-methods/api-methods";
import {
    FETCH_ALL_USERS,
    GET_TOTAL_USERS_COUNT,
    CLEAR_ALL_USER_STATES,
} from "../../reducers/user-reducer/user-reducer";

// Note: Action function to get toTal users count...!
const getTotalUsersCount = () => {
    return async (dispatch) => {
        try {
            const response = await instance({
                method: apiCallMethods.get,
                url: process.env.NEXT_PUBLIC_USERS_GET_TOTAL_COUNT,
            });
            // console.log("Api res: ", response);

            const { status, data } = response;
            if (status == 200) {
                dispatch({
                    type: GET_TOTAL_USERS_COUNT,
                    payload: data?.data
                });
            }
        }

        catch (error) {
            console.log('Something went wrong while get total users api integration: ', error);
        };
    };
};

// Note: Action function to fetch all users...!
const fetchAllUsers = () => {
    return async (dispatch) => {
        try {
            const response = await instance({
                method: apiCallMethods.get,
                url: process.env.NEXT_PUBLIC_FETCH_ALL_USERS
            });
            // console.log("Api res: ", response);

            const { status, data } = response;
            if (status == 200) {
                dispatch({
                    type: FETCH_ALL_USERS,
                    payload: data?.data
                });
            }
        }

        catch (error) {
            console.log('Something went wrong while fetching all users api integration: ', error);
        };
    };
};

// Note: Action function to clear all user states...!
const clearAllUserStates = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_ALL_USER_STATES
        });
    };
};

// Note: Action function to create / add user...!
const createUser = (userData, resHandler) => {
    return async () => {
        // console.log('User Data: ', userData);

        try {
            const response = await instance({
                method: apiCallMethods.post,
                data: userData,
                url: process.env.NEXT_PUBLIC_CREATE_USER
            });
            // console.log('Res: ', response);

            const { status, data } = response;
            if (status == 200) resHandler(data);
        }

        catch (error) {
            console.log("Something went wrong while integrating create user api: ", error);
        };
    };
};

// Note: Action function to delete user...!
const deleteUser = (userId, resHandler) => {
    return async () => {
        // console.log('User Id: ', userId);

        try {
            const response = await instance({
                method: apiCallMethods.patch,
                data: { userId: userId },
                url: process.env.NEXT_PUBLIC_DELETE_USER
            });
            // console.log('Res: ', response);

            const { status, data } = response;
            if (status == 200) resHandler(response, "User deleted successfully");
        }

        catch (error) {
            console.log("Something went wrong while integrating delete user api: ", error);
            const errRes = error?.response;
            errRes && resHandler(errRes);
        };
    };
};

// Note: Action function to update user...!
const updateUser = (userData, resHandler) => {
    return async () => {
        // console.log('User Data: ', userData);

        try {
            const response = await instance({
                method: apiCallMethods.post,
                data: userData,
                url: process.env.NEXT_PUBLIC_UPDATE_USER
            });
            // console.log('Res: ', response);

            const { status, data } = response;
            if (status == 200) resHandler(response , "User updated successfully");
        }

        catch (error) {
            console.log("Something went wrong while integrating delete user api: ", error);
            const errRes = error?.response;
            errRes && resHandler(errRes);
        };
    };
};

export {
    fetchAllUsers,
    getTotalUsersCount,
    clearAllUserStates,
    createUser,
    deleteUser,
    updateUser
};