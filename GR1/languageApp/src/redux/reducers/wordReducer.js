import * as types from './../constants/action-types';
var wordAc = {
    isWord: true, 
    isAll: true,
    isHira: true,
    isKanji: false,
    isMean: true,
    isReverse: false,
    isMemerize: false, 
    isNotMemerize: false,
    isLike: false,
    wordList: []
};

var wordReducer = (state = wordAc, action) => {
    switch (action.type) {
        case types.WORD: {
            return { 
                ...state,
                isWord: action.isWord,
            };
        }
        case types.ALL_WORD: {
            return { 
                ...state,
                isAll: action.isAll,
            };
        }
        case types.ALL_HIRA: {
            return { 
                ...state,
                isHira: action.isHira,
            };
        }
        case types.ALL_KANJI: {
            return { 
                ...state,
                isKanji: action.isKanji,
            };
        }
        case types.ALL_MEAN: {
            return { 
                ...state,
                isMean: action.isMean,
            };
        }
        case types.ALL_REVERSE: {
            return { 
                ...state,
                isReverse: action.isReverse,
            };
        }
        case types.ALL_MEMERIZE: {
            return { 
                ...state,
                isMemerize: action.isMemerize,
            };
        }
        case types.ALL_NOTMEMERIZE: {
            return { 
                ...state,
                isNotMemerize: action.isNotMemerize,
            };
        }
        case types.ALL_LIKE: {
            return { 
                ...state,
                isLike: action.isLike,
            };
        }
        case types.GET_LIST_WORD_REQUEST: {
            return { 
                ...state,
            };
        }
        case types.GET_LIST_WORD_SUCCESS: {
            const data = action.payload;
            return {
                ...state,
                wordList: data.wordList,
            }
        }

        default:
            return state;
    }
}
export default wordReducer;