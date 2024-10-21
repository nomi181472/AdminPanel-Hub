/***** Note: All auth related action functions are defined here *****/

import instance from "@/api/axios/axios";
import apiCallMethods from "@/api/api-methods/api-methods";
import {
    GET_ALL_ROLES,
    GET_TOTAL_FEATURES,
    GET_MATRIX_DATA_BY_FEATURE_NAME,
    CLEAR_MATRIX_DATA,
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

// Note: Action function to fetch all roles...!
const getAllRoles = () => {
    return async (dispatch) => {
        try {
            const response = await instance({
                method: apiCallMethods.get,
                url: process.env.NEXT_PUBLIC_FETCH_ALL_ROLES
            });
            // console.log("Api res: ", response);

            const { status, data } = response;
            if (status == 200) {
                dispatch({
                    type: GET_ALL_ROLES,
                    payload: data?.data
                });
            };
        }

        catch (error) {
            console.log('Something went wrong while getting all roles api integration: ', error);
        };
    };
};

// Note: Action function to get matrix data by feature name...!
const getMatrixDataByFeatureName = (featureName) => {
    return async (dispatch) => {
        // console.log("Feature Name", featureName);

        try {
            const response = await instance({
                method: apiCallMethods.get,
                url: `${process.env.NEXT_PUBLIC_USERS_GET_MATRIX_DATA_BY_FEATURE_NAME}${featureName}`
            });
            // console.log("Api res: ", response);

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

// Note: Action function to add role...!
const addRole = (roleName, resHandler) => {
    return async (dispatch) => {
        // console.log("Add role", roleName);

        try {
            const response = await instance({
                method: apiCallMethods.post,
                url: process.env.NEXT_PUBLIC_ADD_ROLE,
                data: { roleName: roleName }
            });
            // console.log("Api res: ", response);

            const { status, data } = response;
            if (status == 201) {
                resHandler(data);
                dispatch({
                    type: CLEAR_MATRIX_DATA
                });
            }
        }

        catch (error) {
            console.log('Something went wrong while adding role api integration: ', error);
        };
    };
};

// Note: Action function to delete role...!
const deleteRole = (roleId, resHandler) => {
    return async (dispatch) => {
        // console.log("Role id", roleId);

        try {
            const response = await instance({
                method: apiCallMethods.patch,
                url: process.env.NEXT_PUBLIC_DELETE_ROLE,
                data: roleId
            });
            // console.log("Api res: ", response);

            const { status, data } = response;
            if (status == 200) {
                resHandler(response);
                dispatch({
                    type: CLEAR_MATRIX_DATA
                });
            }
        }

        catch (error) {
            console.log('Something went wrong while deleting role api integration: ', error);
            const errRes = error?.response;
            errRes && resHandler(errRes);
        };
    };
};

// Note: Action function to update role...!
const updateRole = (roleData, resHandler) => {
    return async (dispatch) => {
        // console.log("Role Data", roleData);

        try {
            const response = await instance({
                method: apiCallMethods.put,
                url: process.env.NEXT_PUBLIC_UPDATE_ROLE,
                data: roleData
            });
            // console.log("Api res: ", response);

            const { status, data } = response;
            if (status == 200) {
                resHandler(response);
                dispatch({
                    type: CLEAR_MATRIX_DATA
                });
            }
        }

        catch (error) {
            console.log('Something went wrong while updating role api integration: ', error);
            const errRes = error?.response;
            errRes && resHandler(errRes);
        };
    };
};

export {
    getAllFeatures,
    getAllRoles,
    getMatrixDataByFeatureName,
    clearAllRolesStates,
    addRole,
    deleteRole,
    updateRole
};