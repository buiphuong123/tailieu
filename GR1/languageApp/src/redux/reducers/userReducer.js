import * as types from './../constants/action-types';
import { showToastSuccess, showToastError } from '../../helpers/toastHelper';
const initState = { 
    user: {},
 }
const userReducer = (state = initState, action) => {
    switch (action.type) {
        case types.REGISTER_REQUESTING: {
            return {
                ...state,
            }
        }
        case types.REGISTER_SUCCESS: {
            const { message } = action.payload;
            showToastSuccess(message);
            return {
                ...state,
            }
        }
        case types.REGISTER_FAIL: {
            const { error } = action.payload;
            showToastError(error);
            return {
                ...state,
            }
        }

        case types.LOGIN_REQUESTING: {
            return {
                ...state,
            }
        }
        case types.LOGIN_SUCCESS: {
            const data = action.payload;
            if(state.user === {}){
                showToastSuccess("login success");
            }
            return {
                ...state,
                user: data.user,
            }
        }
        case types.PASSWORD_REQUESTING: {
            return{
                ...state
            }
        }
        case types.MAIL_SUCESS: {
            const { message } = action.payload;
            showToastSuccess(message);
            return{
                ...state
            }
        }
        case types.MAIL_FAIL: {
            const { error } = action.payload;
            showToastError(error);
            return{
                ...state
            }
        }
        case types.LOGIN_FAIL: {
            const { error } = action.payload;
            showToastError(error);
            return {
                ...state,
                user: {},
            }
        }
        
        case types.LOGOUT_USER: {
            return {
                ...state,
            }
        }

        case types.TYPE_ISEND: {
            return {
                ...state,
                isEnd: false,
            }
        }
        
        default: 
            return state;
    }
}
export default userReducer;