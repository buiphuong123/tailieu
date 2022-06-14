import {call, put, takeLatest, delay } from 'redux-saga/effects';
import * as types from '../redux/constants/action-types';
import { showLoading, hideLoading } from '../redux/actions/index';
import { allWord, allwordcomment } from '../apis/user';
import { getListWordCommentSuccess} from '../redux/actions/comment.action'
import {getListWordRequest, getListWordSuccess, getListWordLevel} from '../redux/actions/word.action';

function* getWord({ payload }) {
    const { id } = payload;
    yield put(showLoading());
    const resp = yield call(allWord, {
        id: id,
    });
    const { data } = resp;
    if (data.code == 1) {
        yield put(getListWordSuccess(data.wordData));
        // navigation.navigate("WordScreen");
        // navigation.navigate("WordLession");
    }
    else {
        console.log('error');
    }
    // yield delay(100);
    yield put(hideLoading());
}

function* getWordComment({payload}) {
    const {word_id, user_id} = payload;
    yield put(showLoading());
    const resp = yield call(allwordcomment, {
        word_id,
        user_id
    });
    const { data } = resp;
    if(data.code === 1) {
        yield put(getListWordCommentSuccess(data.comment));
    }
    yield put(hideLoading());
}

export function* watchgetWord() {
    yield takeLatest(types.GET_LIST_WORD_REQUEST, getWord);
}

export function* watchgetWordComment() {
    yield takeLatest(types.GET_LIST_WORD_COMMENT_REQUEST, getWordComment);
}

