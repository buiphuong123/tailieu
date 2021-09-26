// quan ly cacs saga khac
import { delay } from 'redux-saga';
// all de chay nhieu saga cung motj luc
import { all, fork } from 'redux-saga/effects';

import { watchLoginUser, watchRegisterUser, watchLogoutUser } from './userSaga';

import {watchFetchDataSaga } from './fetchDataSaga';

export default function* rootSaga() {
    yield all([
        watchLoginUser(),
        watchRegisterUser(),
        watchLogoutUser(),
    ])
}