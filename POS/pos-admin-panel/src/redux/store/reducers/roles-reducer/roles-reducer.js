/***** Note: RolesReducer *****/

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    features: [],
    roles: [],
    matrixDataByFeatureName: null
};

const rolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        CLEAR_MATRIX_DATA: (state, action) => {
            state.matrixDataByFeatureName = null;
        },

        GET_MATRIX_DATA_BY_FEATURE_NAME: (state, action) => {
            let { payload } = action;
            // console.log("Get matrix data in reducer: ", payload);
            state.matrixDataByFeatureName = null;
            state.matrixDataByFeatureName = payload;
        },

        GET_ALL_ROLES: (state, action) => {
            let { payload } = action;
            // console.log("All roles in reducer: ", payload);
            state.roles = payload;
        },

        GET_TOTAL_FEATURES: (state, action) => {
            let { payload } = action;
            // console.log("All features in reducer: ", payload);
            state.features = payload;
        },

        CLEAR_ALL_ROLES_STATES: (state, action) => {
            state.features = [];
            state.roles = [];
            state.matrixDataByFeatureName = null
        },
    }
});

// Action creators are generated for each case reducer function...!
export const
    {
        CLEAR_MATRIX_DATA,
        GET_MATRIX_DATA_BY_FEATURE_NAME,
        GET_TOTAL_FEATURES,
        GET_ALL_ROLES,
        CLEAR_ALL_ROLES_STATES,
    } = rolesSlice.actions;
export default rolesSlice.reducer;