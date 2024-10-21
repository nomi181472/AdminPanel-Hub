/***** Note: UserReducer *****/

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalUserCount: null,
    usersList: []
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        FETCH_ALL_USERS: (state, action) => {
            let { payload } = action;
            // console.log("All users: ", payload);
            state.usersList = payload;
        },

        GET_TOTAL_USERS_COUNT: (state, action) => {
            let { payload } = action;
            // console.log("Total User Count: ", payload);
            state.totalUserCount = payload;
        },

        CLEAR_ALL_USER_STATES: (state, action) => {
            state.totalUserCount = null;
            state.usersList = [];
        },
    }
});

// Action creators are generated for each case reducer function...!
export const
    {
        FETCH_ALL_USERS,
        GET_TOTAL_USERS_COUNT,
        CLEAR_ALL_USER_STATES,
    } = userSlice.actions;
export default userSlice.reducer;