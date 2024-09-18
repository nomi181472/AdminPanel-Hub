/***** Note: Main store file *****/

import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer from "./reducers/reducers";

// Note: Redux store...!
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    })
});

// Note: Redux persist store...!
const persistor = persistStore(store);

export { store, persistor };