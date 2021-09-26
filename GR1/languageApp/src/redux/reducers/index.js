import { combineReducers } from "redux";
import userReducer from './userReducer';
import languageReducer from './languageReducer';
import fetchDataReducer from './fetchDataReducer';
import uiReducer from './uiReducer';

const appReducers = combineReducers({
    userReducer,
    uiReducer,
    languageReducer,
    fetchDataReducer,
});

export default appReducers;