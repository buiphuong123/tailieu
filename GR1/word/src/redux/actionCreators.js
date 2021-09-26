export function isAdding(){
    return {type: 'IS_ADDING'};
}
export function show_all(){
    return { type: 'FILTER_SHOW_ALL'};
}
export function memorized(){
    return { type: 'FILTER_MEMORIZED'};
}
export function need_practice(){
    return { type: 'FILTER_NEED_PRACTICE'};
}
export function toggle_show(id){
    return { type: 'TOGGLE_SHOW', id};
}
export function toggle_memorized(id){
    return { type: 'TOGGLE_MEMORIZED', id};
}
export function add_word(en, vn){
    return { type: 'ADD_WORD', en, vn };
}
export function is_adding(){
    return { type: 'IS_ADDING'};
}
