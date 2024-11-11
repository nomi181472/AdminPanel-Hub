/***** Note: All notification related action functions are defined here *****/

import instance from "@/api/axios/axios";
import apiCallMethods from "@/api/api-methods/api-methods";
import { CLEAR_ALL_NOTIFICATION_STATES } from "../../reducers/notification-reducer/notification-reducer";

// Note: Action function to clear all notification reducer states...!
const clearAllNotificationStates = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_ALL_NOTIFICATION_STATES
        });
    };
};

// Note: Action function to get all actions...!
// const getAllActions = () => {
//     return async (dispatch) => {
//         try {
//             const response = await instance({
//                 method: apiCallMethods.get,
//                 url: process.env.NEXT_PUBLIC_GET_ALL_ACTIONS
//             });
//             // console.log("Api res: ", response);

//             const { status, data } = response;
//             if (status == 200) {
//                 dispatch({
//                     type: GET_ALL_ACTIONS,
//                     payload: data?.data
//                 });
//             };
//         }

//         catch (error) {
//             console.log('Something went wrong while getting all actions api integration: ', error);
//         };
//     };
// };

export { clearAllNotificationStates };