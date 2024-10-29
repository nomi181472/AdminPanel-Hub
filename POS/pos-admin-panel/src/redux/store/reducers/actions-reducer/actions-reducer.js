/***** Note: ActionReducer *****/

import { createSlice } from "@reduxjs/toolkit";

// Note: Initial states...!
const initialState = {
    actions: [],
    overAllActions: []
};

const actionSlice = createSlice({
    name: "actions",
    initialState,
    reducers: {
        CLEAR_ALL_ACTIONS_STATES: (state, action) => {
            state.actions = [];
            state.overAllActions = [];
        },

        GET_ALL_ACTIONS: (state, action) => {
            let { payload } = action;
            // console.log("All actions in reducer: ", payload);
            state.actions = payload;
        },

        GET_OVER_ALL_ACTIONS: (state, action) => {
            let { payload } = action;
            // console.log("Over all actions in reducer: ", payload);
            state.overAllActions = payload;
        }
    }
});

// Action creators are generated for each case reducer function...!
export const
    {
        CLEAR_ALL_ACTIONS_STATES,
        GET_ALL_ACTIONS,
        GET_OVER_ALL_ACTIONS
    } = actionSlice.actions;
export default actionSlice.reducer;