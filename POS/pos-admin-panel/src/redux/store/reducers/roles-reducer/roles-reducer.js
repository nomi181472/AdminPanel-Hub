/***** Note: RolesReducer *****/

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    features: [],
    matrixDataByFeatureName: null
};

const rolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        GET_MATRIX_DATA_BY_FEATURE_NAME: (state, action) => {
            let { payload } = action;
            // console.log("Get matrix data in reducer: ", payload);
            state.matrixDataByFeatureName = null;
            state.matrixDataByFeatureName = payload;
        },

        GET_TOTAL_FEATURES: (state, action) => {
            let { payload } = action;
            // console.log("All features in reducer: ", payload);
            state.features = payload;
        },

        CLEAR_ALL_ROLES_STATES: (state, action) => {
            state.features = [];
            state.matrixDataByFeatureName = null
        },
    }
});

// Action creators are generated for each case reducer function...!
export const
    {
        GET_MATRIX_DATA_BY_FEATURE_NAME,
        GET_TOTAL_FEATURES,
        CLEAR_ALL_ROLES_STATES,
    } = rolesSlice.actions;
export default rolesSlice.reducer;