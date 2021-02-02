import { all } from "redux-saga/effects";
import { changeUserDataSaga, getUserSaga } from "./userHandler";


export function* userSaga () {
    yield all([getUserSaga(), changeUserDataSaga()]) 
}