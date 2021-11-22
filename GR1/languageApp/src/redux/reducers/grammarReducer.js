import * as types from './../constants/action-types';

const initState = { 
    grammartList: [],
 }
const grammarReducer = (state = initState, action) => {
    switch (action.type) {
        case types.GET_GRAMMAR: {
            return {
                ...state,
            }
        }

        case types.GET_GRAMMAR_SUCCESS: {
            const data = action.payload;
            return {
                ...state,
                grammartList: data.grammartList,
            }
        }
        
        default: 
            return state;
    }
}
export default grammarReducer;