/***** Note: Main reducer file *****/

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";

// Note: Importing all reducers...!
import authReducer from './auth-reducer/auth-reducer';

// Note: Persist reducer configuration...!
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authStates']
};

// Note: This is the root reducer...!
const rootReducer = combineReducers({
    authStates: authReducer
});

export default persistReducer(persistConfig, rootReducer);