import * as types from './../constants/action-types';

export const RemoteWord = (isWord)=> {
    return {
        type: types.WORD,
        isWord
    }
}
export const RemoteAllWord = (isAll)=> {
    return {
        type: types.ALL_WORD,
        isAll
    }
}
export const RemoteHiraWord = (isHira)=> {
    return {
        type: types.ALL_HIRA,
        isHira
    }
}
export const RemoteKanjiWord = (isKanji)=> {
    return {
        type: types.ALL_KANJI,
        isKanji
    }
}
export const RemoteMeanWord = (isMean)=> {
    return {
        type: types.ALL_MEAN,
        isMean
    }
}
export const RemoteReverseWord = (isReverse)=> {
    return {
        type: types.ALL_REVERSE,
        isReverse
    }
}
export const RemoteMemerizeWord = (isMemerize)=> {
    return {
        type: types.ALL_MEMERIZE,
        isMemerize
    }
}
export const RemoteNotMemerizeWord = (isNotMemerize)=> {
    return {
        type: types.ALL_NOTMEMERIZE,
        isNotMemerize
    }
}
export const RemoteLikeWord = (isLike)=> {
    return {
        type: types.ALL_LIKE,
        isLike
    }
}

//saga
export function getListWordRequest (id, navigation) {
    return {
        type: types.GET_LIST_WORD_REQUEST,
        payload: { id },
        navigation
    }
}
export const getListWordSuccess = (wordList) => {
    return {
        type: types.GET_LIST_WORD_SUCCESS,
        payload: {wordList},
    }
};