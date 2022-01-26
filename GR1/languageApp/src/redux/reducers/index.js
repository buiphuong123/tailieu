import { combineReducers } from "redux";
import userReducer from './userReducer';
import languageReducer from './languageReducer';
import fetchDataReducer from './fetchDataReducer';
import uiReducer from './uiReducer';
import commentReducer from "./commentReducer";
import grammarReducer from "./grammarReducer";
import notifiReducer from "./notifiReducer";
import wordReducer from "./wordReducer";
import grammarquestionReducer from "./grammarquestionReducer";

const appReducers = combineReducers({
    userReducer,
    uiReducer,
    languageReducer,
    fetchDataReducer,
    commentReducer,
    grammarReducer,
    notifiReducer,
    wordReducer,
    grammarquestionReducer
});

export default appReducers;