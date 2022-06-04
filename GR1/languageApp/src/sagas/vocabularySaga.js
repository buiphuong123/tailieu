import {call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../redux/constants/action-types';
import { showLoading, hideLoading } from '../redux/actions/index';
import { allVocabulary } from '../apis/user';
import {getListVocaSuccess} from '../redux/actions/vocabulary.action';

function* getListVocabulary({ payload }) {
    const { user_id } = payload;
    console.log('vocubary', user_id);
    yield put(showLoading());
    const resp = yield call(allVocabulary, {
        user_id: user_id,
    });
    const { data } = resp;
    if (data.code == 1) {
        yield put(getListVocaSuccess(data.vocabulary));
    }
    else {
        console.log('vocabulary error');
    }
    // yield delay(100);
    yield put(hideLoading());
}

export function* watchgetVocabulary() {
    yield takeLatest(types.GET_LIST_VOCABULARY_REQUEST, getListVocabulary);
}