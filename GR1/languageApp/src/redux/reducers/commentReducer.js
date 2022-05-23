import * as types from './../constants/action-types';

const initState = { 
    commentList: [],
    commentWordList: [],
    commentKanjiList: []
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

        case types.GET_LIST_WORD_COMMENT_REQUEST: {
            return {
                ...state,
            }
        }

        case types.GET_LIST_WORD_COMMENT: {
            const data = action.payload;
            return {
                ...state,
                commentWordList: data.commentWordList,
            }
        }

        case types.GET_LIST_KANJI_COMMENT_REQUEST: {
            return {
                ...state,
            }
        }

        case types.GET_LIST_KANJI_COMMENT_SUCCESS: {
            const data = action.payload;
            return {
                ...state,
                commentKanjiList: data.commentKanjiList,
            }
        }
        
        default: 
            return state;
    }
}
export default commentReducer;