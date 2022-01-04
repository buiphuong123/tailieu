import {call, put, takeLatest, delay } from 'redux-saga/effects';
import * as types from '../redux/constants/action-types';
import { listNotifi } from '../apis/user';
import {getListNotifiSuccess } from '../redux/actions/notifi.action';
import { showLoading, hideLoading} from '../redux/actions/index';

function* getNotification({ payload }) {
    const { username } = payload;
    // yield put(showLoading());
    const resp = yield call(listNotifi, {
        username: username
    });
    const { data } = resp;
    if (data.code === 1) {
        yield put(getListNotifiSuccess(data.listNoti));
    }
    else {
        console.log('error');
    }
    // yield delay(100);
    // yield put(hideLoading());
}


export function* watchgetNotifi() {
    yield takeLatest(types.GET_NOTIFI, getNotification);
}

