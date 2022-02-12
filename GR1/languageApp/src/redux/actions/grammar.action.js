import * as types from './../constants/action-types';

export function getAllGrammar () { 
    return {
      type: types.GET_ALL_GRAMMAR,
      navigation
    }
}

export const getAllGrammarSuccess = (listAllGrammar) => {
    return {
        type: types.GET_ALL_GRAMMAR_SUCCESS,
        payload: {listAllGrammar},
    }
};
