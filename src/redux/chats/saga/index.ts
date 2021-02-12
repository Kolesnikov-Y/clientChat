import { all } from "redux-saga/effects";
import { createNewChatSaga, debounceSaga, deleteMessageSaga, editMessageSaga, getNeedChatSaga } from "./chatsHandler";

export function* chatsSaga() {
    yield all([debounceSaga(), createNewChatSaga(), getNeedChatSaga(), deleteMessageSaga(), editMessageSaga()])
}