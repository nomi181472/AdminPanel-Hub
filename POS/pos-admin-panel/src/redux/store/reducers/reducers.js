/***** Note: Main reducer file *****/

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";

// Note: Importing all reducers...!
import authReducer from './auth-reducer/auth-reducer';
import userReducer from "./user-reducer/user-reducer";
import rolesReducer from "./roles-reducer/roles-reducer";
import actionReducer from './actions-reducer/actions-reducer';
import notificationReducer from "./notification-reducer/notification-reducer";
import errorReducer from "./error-reducer/error-reducer";

// Note: Persist reducer configuration...!
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authStates']
};

// Note: This is the root / combine reducer...!
const rootReducer = combineReducers({
    authStates: authReducer,
    userStates: userReducer,
    roleStates: rolesReducer,
    actionsStates: actionReducer,
    notificationStates: notificationReducer,
    errorStates: errorReducer
});

export default persistReducer(persistConfig, rootReducer);