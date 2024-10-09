/***** Note: AuthReducer *****/

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authenticatedUser: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        LOG_IN_USER: (state, action) => {
            let { payload } = action;
            // console.log("User data in auth reducer: ", payload);
            state.authenticatedUser = payload;
        },

        LOG_OUT_USER: (state, action) => {
            state.authenticatedUser = null;
        },
    }
});

// Action creators are generated for each case reducer function...!
export const
    {
        LOG_IN_USER,
        LOG_OUT_USER
    } = authSlice.actions;
export default authSlice.reducer;