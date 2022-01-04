// all de chay nhieu saga cung motj luc
import { all, fork } from 'redux-saga/effects';

import { watchLoginUser, watchRegisterUser, watchsendMail, watchLogoutUser } from './userSaga';
import { watchgetComment, watchgetGrammar } from './grammarSaga';
import { watchgetNotifi } from './notiSaga';
import { watchgetWord } from './wordSaga';
export default function* rootSaga() {
    yield all([
        watchLoginUser(),
        watchRegisterUser(),
        watchLogoutUser(),
        watchsendMail(),
        watchgetGrammar(),
        watchgetComment(),
        watchgetNotifi(),
        watchgetWord(),
    ])
}