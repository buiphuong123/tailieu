import * as types from './../constants/action-types';

const initState = { 
    notifiList: [],
 }
const notifiReducer = (state = initState, action) => {
    switch (action.type) {
        case types.GET_NOTIFI: {
            return {
                ...state,
            }
        }

        case types.GET_NOTIFI_SUCCESS: {
            const data = action.payload;
            return {
                ...state,
                notifiList: data.notifiList,
            }
        }
        
        default: 
            return state;
    }
}
export default notifiReducer;