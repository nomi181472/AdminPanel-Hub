/***** Note: All auth related action functions are defined here *****/

import instance from "@/api/axios/axios";
import apiCallMethods from "@/api/api-methods/api-methods";
import {
    GET_MATRIX_DATA_BY_FEATURE_NAME,
    GET_TOTAL_FEATURES,
    CLEAR_ALL_ROLES_STATES,
}
    from "../../reducers/roles-reducer/roles-reducer";

// Note: Action function to fetch all features...!
const getAllFeatures = () => {
    return async (dispatch) => {
        try {
            const response = await instance({
                method: apiCallMethods.get,
                url: process.env.NEXT_PUBLIC_USERS_GET_ALL_FEATURES
            });
            // console.log("Api res: ", response);

            const { status, data } = response;
            if (status == 200) {
                dispatch({
                    type: GET_TOTAL_FEATURES,
                    payload: data?.data?.features
                });
            };
        }

        catch (error) {
            console.log('Something went wrong while getting all features api integration: ', error);
        };
    };
};

// Note: Action function to get matrix data by feature name...!
const getMatrixDataByFeatureName = (featureName) => {
    return async (dispatch) => {
        console.log("Feature Name", featureName);

        try {
            const response = await instance({
                method: apiCallMethods.get,
                url: `${process.env.NEXT_PUBLIC_USERS_GET_MATRIX_DATA_BY_FEATURE_NAME}${featureName}`
            });
            console.log("Api res: ", response);

            const { status, data } = response;
            if (status == 200) {
                dispatch({
                    type: GET_MATRIX_DATA_BY_FEATURE_NAME,
                    payload: data?.data
                });
            };
        }

        catch (error) {
            console.log('Something went wrong while getting matrix data by feature name api integration: ', error);
        };
    };
};

// Note: Action function to clear all roles reducer states...!
const clearAllRolesStates = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_ALL_ROLES_STATES
        });
    };
};

export {
    getAllFeatures,
    getMatrixDataByFeatureName,
    clearAllRolesStates
};