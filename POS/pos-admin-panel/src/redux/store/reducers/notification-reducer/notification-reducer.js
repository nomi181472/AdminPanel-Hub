/***** Note: NotificationReducer *****/

import { createSlice } from "@reduxjs/toolkit";

// Note: Initial states...!
const initialState = {
    allNotificationsList: [],
    userWiseNotificationsList: []
};

const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        CLEAR_ALL_NOTIFICATION_STATES: (state, action) => {
            state.allNotificationsList = [];
            state.userWiseNotificationsList = [];
        },

        GET_ALL_NOTIFICATIONS: (state, action) => {
            let { payload } = action;
            console.log("All notifications in reducer: ", payload);
        }
    }
});

// Action creators are generated for each case reducer function...!
export const
    {
        CLEAR_ALL_NOTIFICATION_STATES,
        GET_ALL_NOTIFICATIONS
    } = notificationSlice.actions;
export default notificationSlice.reducer;