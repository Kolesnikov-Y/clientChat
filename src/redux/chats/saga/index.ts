import { all } from "redux-saga/effects";
import { createNewChatSaga, debounceSaga } from "./chatsHandler";

export function* chatsSaga() {
    yield all([debounceSaga(), createNewChatSaga()])
}