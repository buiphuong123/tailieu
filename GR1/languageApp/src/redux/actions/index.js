import * as types from './../constants/action-types';

export const changeLanguage = language => {
    return {
        type: types.CHANGE_LANGUAGE,
        language
    }
}

export function fetchData(data) {
    return {
        type: types.SEND_REQUEST,
        payload: data
    }
}

export const fetchDataSuccess = (user) => {
    return {
        type: types.SEND_REQUEST_SUCCESS,
        payload: {user }
    }
}

export const fetchDataFailure = (error) => {
    return {
        type: types.SEND_REQUEST_FAILURE,
        payload: {},
        error: {error},
    }
}

export function loginRequest (username, password) { 
    return {
      type: types.LOGIN_REQUESTING,
      payload: {username, password}
    }
}

export const loginUserSuccess = (user) => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: {user}
    }
}

export const loginUserFail = (error) => {
    return {
        type: types.LOGIN_FAIL,
        payload: {error}
    }
}

export function registerRequest (username, email, password) { 
    return {
      type: types.REGISTER_REQUESTING,
      payload: {username, email, password}
    }
}

export const registerUserSuccess = (message) => {
    return {
        type: types.REGISTER_SUCCESS,
        payload: {message}
    }
}

export const registerUserFail = (error) => {
    return {
        type: types.REGISTER_FAIL,
        payload: {error}
    }
}

export function logoutUser(user) {
    return {
        type: types.LOGOUT_USER,
        payload: {user}
    }
}

export function logoutSuccess() {
    return {
        type: types.LOGOUT_SUCCESS,
    }
}

export function setIsEnd() {
    return {
        type: types.TYPE_ISEND,
    }
}

export const showLoading = () => ({
    type: types.SHOW_LOADING,
  });
  
  export const hideLoading = () => ({
    type: types.HIDE_LOADING,
  });

