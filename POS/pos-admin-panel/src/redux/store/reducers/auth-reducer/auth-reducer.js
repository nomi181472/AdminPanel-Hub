/***** Note: AuthReducer *****/

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userToken: undefined,
    authenticatedUser: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        LOG_IN_USER: (state, action) => {
            let { payload } = action;
            // console.log("User data in auth reducer: ", payload);
        },
    }
});

// Action creators are generated for each case reducer function...!
export const
    {
        LOG_IN_USER
    } = authSlice.actions;
export default authSlice.reducer;