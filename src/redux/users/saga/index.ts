import { all } from "redux-saga/effects";
import { addChatToUsersSaga, getUserSaga } from "./userHandler";


export function* userSaga () {
    yield all([getUserSaga(), addChatToUsersSaga()]) 
}