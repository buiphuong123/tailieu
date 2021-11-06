import {call, put, takeLatest, delay } from 'redux-saga/effects';
import * as types from '../redux/constants/action-types';
import { showLoading, hideLoading, getGrammarSuccess, getGrammarFail } from '../redux/actions/index';
import { getGra } from '../apis/user';

function* getGrammar({ navigation }) {
    yield put(showLoading());
    const resp = yield call(getGra);
    const { data } = resp;
    if (data.code == 1) {
        yield put(getGrammarSuccess());
        navigation.navigate("GrammarScr", {dataGrammar: data.grammar});
    }
    else {
        yield put(getGrammarFail(data.error));
    }
    yield delay(100);
    yield put(hideLoading());
}


export function* watchgetGrammar() {
    yield takeLatest(types.GET_GRAMMAR, getGrammar);
}

