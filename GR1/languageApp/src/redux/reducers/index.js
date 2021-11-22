import { combineReducers } from "redux";
import userReducer from './userReducer';
import languageReducer from './languageReducer';
import fetchDataReducer from './fetchDataReducer';
import uiReducer from './uiReducer';
import commentReducer from "./commentReducer";
import grammarReducer from "./grammarReducer";

const appReducers = combineReducers({
    userReducer,
    uiReducer,
    languageReducer,
    fetchDataReducer,
    commentReducer,
    grammarReducer
});

export default appReducers;