const isAddingReducer = (state = false, action) => {
    if(action.type ==='IS_ADDING') return !state.isAdding;
    return state;
}
export default isAddingReducer;