/***** Note: UserReducer *****/

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalUserCount: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        GET_TOTAL_USERS_COUNT: (state, action) => {
            let { payload } = action;
            // console.log("Total User Count: ", payload);
            state.totalUserCount = payload;
        },

        CLEAR_ALL_USER_STATES: (state, action) => {
            state.totalUserCount = null;
        },
    }
});

// Action creators are generated for each case reducer function...!
export const
    {
        GET_TOTAL_USERS_COUNT,
        CLEAR_ALL_USER_STATES,
    } = userSlice.actions;
export default userSlice.reducer;