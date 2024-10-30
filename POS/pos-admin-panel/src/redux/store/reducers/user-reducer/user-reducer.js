/***** Note: UserReducer *****/

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usersList: [],
    totalUserCount: null,
    newUsersCountByMonth: 0,
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

        GET_NEW_USERS_COUNT_BY_MONTH: (state, action) => {
            let { payload } = action;
            state.newUsersCountByMonth = payload;
        },

        CLEAR_ALL_USER_STATES: (state, action) => {
            state.usersList = [];
            state.totalUserCount = null;
            state.newUsersCountByMonth = 0;
        },
    }
});

// Action creators are generated for each case reducer function...!
export const
    {
        FETCH_ALL_USERS,
        GET_TOTAL_USERS_COUNT,
        GET_NEW_USERS_COUNT_BY_MONTH,
        CLEAR_ALL_USER_STATES,
    } = userSlice.actions;
export default userSlice.reducer;