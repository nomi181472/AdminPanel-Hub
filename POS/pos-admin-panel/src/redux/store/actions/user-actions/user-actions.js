/***** Note: All user related action functions are defined here *****/

import instance from "@/api/axios/axios";
import apiCallMethods from "@/api/api-methods/api-methods";
import {
    GET_TOTAL_USERS_COUNT,
    CLEAR_ALL_USER_STATES
} from "../../reducers/user-reducer/user-reducer";

// Note: Action function to get ttoal users count...!
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

// Note: Action function to clear all user states...!
const clearAllUserStates = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_ALL_USER_STATES
        });
    };
};

export {
    getTotalUsersCount,
    clearAllUserStates
};