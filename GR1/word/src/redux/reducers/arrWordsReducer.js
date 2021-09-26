const defaultArrWords =  [
    { id: 1, en: 'action', vn: 'hành động', memorized: true, isShow: false },
    { id: 2, en: 'actor', vn: 'dien vien', memorized: false, isShow: false },
    { id: 3, en: 'activity', vn: 'hoat động', memorized: true, isShow: false },
    { id: 4, en: 'active', vn: 'chu dong', memorized: true, isShow: false },
    { id: 5, en: 'bath', vn: 'tam', memorized: false, isShow: false },
    { id: 6, en: 'bedroom', vn: 'phong ngu', memorized: true, isShow: false },
    { id: 7, en: 'yard', vn: 'san', memorized: false, isShow: false },
    { id: 8, en: 'yesterday', vn: 'hom qua', memorized: true, isShow: false },
    { id: 9, en: 'young', vn: 'tre', isShow: true, isShow: false },
    { id: 10, en: 'zero', vn: 'so 0', isShow: false, isShow: false },

  ];
  
  const arrWordsReducer = (state=defaultArrWords,action) =>{
    if(action.type==='TOGGLE_MEMORIZED'){ 
        return state.map(e=>{
            if(e.id !== action.id) return e;
            return { ...e, memorized: !e.memorized};
        });
    }
    if(action.type==='TOGGLE_SHOW'){
        return state.map(e =>{
            if(e.id !== action.id) return e;
            return { ...e, isShow: !e.isShow};
        })
    }
    if(action.type ==='ADD_WORD'){
        return [{
            id: defaultArrWords.length + 1,
            en: action.en, 
            vn: action.vn,
            memorized: false,
            isShow: false
        }].concat(state);
    }
    return state;

}
export default arrWordsReducer;