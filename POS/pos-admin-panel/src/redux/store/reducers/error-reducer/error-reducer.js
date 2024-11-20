/***** Note: ErrorReducer *****/

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    errorMessage: null
};

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        SET_ERROR: (state, action) => {
            const { payload } = action;
            // console.log('403 Error occurued in api call: ', payload);
            state.errorMessage = payload;
        },

        CLEAR_ERROR_MESSAGE: (state, action) => {
            state.errorMessage = null;
        },
    }
});

// Action creators are generated for each case reducer function...!
export const
    {
        SET_ERROR,
        CLEAR_ERROR_MESSAGE
    } = errorSlice.actions;
export default errorSlice.reducer;