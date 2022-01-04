import {call, put, takeLatest, delay } from 'redux-saga/effects';
import * as types from '../redux/constants/action-types';
import { showLoading, hideLoading } from '../redux/actions/index';
import { allWord } from '../apis/user';
import {getListWordSuccess} from '../redux/actions/word.action'

function* getWord({ payload, navigation }) {
    const { id } = payload;
    console.log('id nhan dau vao la', id);
    yield put(showLoading());
    const resp = yield call(allWord, {
        id: id,
    });
    const { data } = resp;
    if (data.code == 1) {
        console.log(data.wordData);
        yield put(getListWordSuccess(data.wordData));
        navigation.navigate("WordScreen");
    }
    else {
        console.log('error');
    }
    // yield delay(100);
    yield put(hideLoading());
}

export function* watchgetWord() {
    yield takeLatest(types.GET_LIST_WORD_REQUEST, getWord);
}

