import * as types from './../constants/action-types';

const vocabularyAc = {
    vocabularyList: [],
   
};

var vocabularyReducer = (state = vocabularyAc, action) => {
    switch (action.type) {
        case types.GET_LIST_VOCABULARY_REQUEST: {
            return {
                ...state,
            };
        }
        case types.GET_LIST_VOCABULARY_SUCCESS: {
            const data = action.payload;
            return {
                ...state,
                vocabularyList: data.vocabularyList,
            }
        }
        
        default:
            return state;
    }
}

export default vocabularyReducer