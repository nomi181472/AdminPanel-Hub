/***** Note: Axios Configuration File *****/

import axios from "axios";
import { store } from "@/redux/store/store";
import { SET_ERROR } from "@/redux/store/reducers/error-reducer/error-reducer";

const urls = {
    _7080_Port_Url: process.env.NEXT_PUBLIC_API_URL
};

// Default config options...!
const defaultOptions = {
    baseURL: urls._7080_Port_Url,
    headers: {
        "Content-Type": "application/json",
    }
};

// Create instance...!
const instance = axios.create(defaultOptions);

// Set the AUTH token for any request...!
instance.interceptors.request.use(
    (config) => {
        let fetchToken = localStorage.getItem("AuthToken");
        let parseToken = JSON.parse(fetchToken);
        // console.log('Axios token: ', parseToken);
        config.headers.Authorization = parseToken ? `Bearer ${parseToken}` : "";
        return config;
    },

    (error) => {
        return Promise.reject(error);
    });

// Add a response interceptor for handling network errors
instance.interceptors.response.use(
    (response) => {
        // Return the response if it's successful
        return response;
    },

    (error) => {
        // Check for network error (e.g., no response received)

        if (error.response && error.response.status === 403) {
            // Note: Set error message in redux error state (Globally).
            store.dispatch({
                type: SET_ERROR,
                payload: "Access forbidden. You don't have permission to access this resource.",
            });
        }

        // Note: Handle network error...!
        if (!error.response) {
            console.log("Internet disconnected or server loss:", error);
        };

        // Note: Return the error to be handled where it's needed (or globally)...!
        return Promise.reject(error);
    }
);

export default instance;