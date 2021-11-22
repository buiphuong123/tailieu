import * as types from './../constants/action-types';

const initState = { 
    commentList: [],
 }
const commentReducer = (state = initState, action) => {
    switch (action.type) {
        case types.GET_LIST_COMMENT_REQUEST: {
            return {
                ...state,
            }
        }

        case types.GET_LIST_COMMENT: {
            const data = action.payload;
            return {
                ...state,
                commentList: data.commentList,
            }
        }
        
        default: 
            return state;
    }
}
export default commentReducer;