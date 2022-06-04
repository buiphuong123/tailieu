import {call, put, takeLatest, delay } from 'redux-saga/effects';
import * as types from '../redux/constants/action-types';
import { allPost } from '../apis/user';
import { getListPostSuccess} from '../redux/actions/post.action';
import { showLoading, hideLoading} from '../redux/actions/index';

function* getListPost({payload}) {
    const {id} = payload;
    yield put(showLoading());
    const resp = yield call(allPost, {
        id: id
    });
    const { data } = resp;
    if(data.code === 1) {
        yield put(getListPostSuccess(data.postData));
    }
    else {
        console.log('error');
    }
    yield put(hideLoading());
}

export function* watchgetPost() {
    yield takeLatest(types.GET_POST, getListPost);
}
