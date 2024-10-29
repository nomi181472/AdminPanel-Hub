/***** Note: All actions related action functions are defined here *****/

import instance from "@/api/axios/axios";
import apiCallMethods from "@/api/api-methods/api-methods";
import {
    CLEAR_ALL_ACTIONS_STATES,
    GET_ALL_ACTIONS,
    GET_OVER_ALL_ACTIONS
} from "../../reducers/actions-reducer/actions-reducer";

// Note: Action function to clear all actions reducer states...!
const clearAllActionStates = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_ALL_ACTIONS_STATES
        });
    };
};

// Note: Action function to get all actions...!
const getAllActions = () => {
    return async (dispatch) => {
        try {
            const response = await instance({
                method: apiCallMethods.get,
                url: process.env.NEXT_PUBLIC_GET_ALL_ACTIONS
            });
            // console.log("Api res: ", response);

            const { status, data } = response;
            if (status == 200) {
                dispatch({
                    type: GET_ALL_ACTIONS,
                    payload: data?.data
                });
            };
        }

        catch (error) {
            console.log('Something went wrong while getting all actions api integration: ', error);
        };
    };
};

// Note: Action function to get over all actions...!
const getOverAllActions = () => {
    return async (dispatch) => {
        try {
            const response = await instance({
                method: apiCallMethods.get,
                url: process.env.NEXT_PUBLIC_GET_OVER_ALL_ACTIONS
            });
            // console.log("Api res: ", response);

            const { status, data } = response;
            if (status == 200) {
                dispatch({
                    type: GET_OVER_ALL_ACTIONS,
                    payload: data?.data
                });
            };
        }

        catch (error) {
            console.log('Something went wrong while getting over all actions api integration: ', error);
        };
    };
};

// Note: Action function to add action...!
const addAction = (actionData, resHandler) => {
    return async (dispatch) => {
        // console.log("Action Data: ", actionData);

        try {
            const response = await instance({
                method: apiCallMethods.post,
                url: process.env.NEXT_PUBLIC_ADD_ACTION,
                data: actionData
            });
            // console.log("Api res: ", response);

            const { status, data } = response;
            if (status == 201) resHandler(response);
        }

        catch (error) {
            console.log('Something went wrong while adding action api integration: ', error);
        };
    };
};

// Note: Action function to delete action...!
const deleteAction = (actionId, resHandler) => {
    return async (dispatch) => {
        // console.log("Action Id: ", actionId);

        try {
            const response = await instance({
                method: apiCallMethods.patch,
                url: `${process.env.NEXT_PUBLIC_DELETE_ACTION}${actionId}`
            });
            // console.log("Api res: ", response);

            const { status, data } = response;
            if (status == 200) resHandler(response);
        }

        catch (error) {
            console.log('Something went wrong while deleting action api integration: ', error);
        };
    };
};

export {
    clearAllActionStates,
    getAllActions,
    getOverAllActions,
    addAction,
    deleteAction,
};