/***** Note: Axios Configuration File *****/

import axios from "axios";

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
        if (!error.response) {
            const netDisconnectedOrServerLoss = error;
            console.log("Internet disconnected or server loss: " , netDisconnectedOrServerLoss);
            alert("Network error: Please check your internet connection.");
        };

        // Return the error to be handled where it's needed (or globally)
        return Promise.reject(error);
    }
);

export default instance;