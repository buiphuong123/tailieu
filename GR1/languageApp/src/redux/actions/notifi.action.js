import * as types from './../constants/action-types';

export function getListNotifiRequest (username) { 
    return {
      type: types.GET_NOTIFI,
      payload: {username},
      
    }
}

export const getListNotifiSuccess = (notifiList) => {
    return {
        type: types.GET_NOTIFI_SUCCESS,
        payload: {notifiList},
    }
};
