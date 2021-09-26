import {call, put, takeEvery, takeLatest, takeLeading, delay } from 'redux-saga/effects';
import axios from 'axios';
import * as types from '../redux/constants/action-types';
import { showLoading, hideLoading, loginUserSuccess, loginUserFail, registerUserFail, registerUserSuccess, logoutSuccess } from '../redux/actions/index';
import { login, register } from '../apis/user';
import NavigationService from '../navigations/NavigationService';
// import { CommonActions  } from '@react-navigation/native';

function* loginUs({ payload }) {
    const { username, password } = payload;
    yield put(showLoading());
    const resp = yield call(login, {
        username,
        password,
        // status: STATUSES[0].value,
    });
    const { data } = resp;
    if (data.code == 1) {
        yield put(loginUserSuccess(data.user));
        yield NavigationService.navigate("Drawer");
        // yield put(CommonActions .navigate({ routeName: 'Drawer' }));
        // yield CommonActions.navigate('Drawer');
        console.log('xong roi');
    }
    else {
        yield put(loginUserFail(data.error));
    }
    yield delay(100);
    yield put(hideLoading());
}

function *registerUs({ payload }) {
    const { username, email, password } = payload;
    yield put(showLoading());
    const resp = yield call(register, {
        username,
        email,
        password
    });
    const { data } = resp;
    if (data.code == 1) {
        yield put(registerUserSuccess(data.success));
    }
    else {
        yield put(registerUserFail(data.error));
    }
    yield delay(100);
    yield put(hideLoading());
}

function* logoutUser({ payload }) {
    const { user } = payload;
    console.log('user saga logout', user);
    // try {
    //     const urll = "http://192.168.1.7:3002/language/logout";
    //     const response = yield call(() => axios.post(urll, {
    //         token
    //     }));
    //     if(response.data.code == 1){
    //         yield put(logoutSuccess());
    //     }
    //     else {
    //         console.log('error');
    //     }

    // }catch(error){
    //     console.log(error);
    // }
}

export function* watchLoginUser() {
    yield takeLatest(types.LOGIN_REQUESTING, loginUs);
}

export function* watchRegisterUser() {
    yield takeLatest(types.REGISTER_REQUESTING, registerUs);
}

export function* watchLogoutUser() {
    yield takeLatest(types.LOGOUT_USER, logoutUser);
}