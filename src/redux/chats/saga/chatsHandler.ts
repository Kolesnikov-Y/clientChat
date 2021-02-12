import axios, { AxiosResponse } from "axios";
import { defineAction } from "rd-redux-utils"
import { debounce, put, takeEvery } from "redux-saga/effects"
import { RequestCreateChatModel } from "../../../model";
import { UserChatModel, UserDataModel } from "../../../pages/user/UserContainer";
import { addUsersChatAction } from "../../users/store/actions";
import { createNewChatAction, debounceUserSearchAction, deleteMessageAction, editMessageAction, findUserByNameAction, setChatroomAction } from "../store/actions"
import { InitialChatModel } from "../store/reducers"

// ============= ACTIONS ============= 

export const startOfServerAccessAction = defineAction<InitialChatModel>("START_OF_SERVER_ACCESS"); 
export const failServerAccessAction = defineAction<InitialChatModel>("FAIL_OF_SERVER_ACCESS"); 
export const completedGetUserByName = defineAction<InitialChatModel>('COMPLETED_GET_FEATURE_BY_NAME'); 
export const completedCreateNewChatroomAction = defineAction<InitialChatModel>("COMPLETED_CREATE_NEW_CHATROOM_ACTION"); 
export const completedGetNeedChatAction = defineAction<InitialChatModel>('COMPLETED_GET_NEED_CHATROOM');
export const completedDeleteMessageAction = defineAction<InitialChatModel>('COMPLETED_DELETE_MESSAGE');
export const completedEditMessageAction = defineAction<InitialChatModel>('COMPLETED_EDIT_MESSAGE');


const currentChat= {
    chatId: '', 
    chatTitle: [], 
    messages: []
}

// ============= SAGAS =============

export function* createNewChatSaga() {
   yield takeEvery(createNewChatAction.TYPE, function* (
        action: typeof createNewChatAction.typeOf.action
    ) {
        const actionPayload: RequestCreateChatModel = action; 

        try {

            yield put(
                startOfServerAccessAction({
                    status: 'running',
                    users: [], 
                    currentChat: currentChat,
                })
            )
            
            const response: AxiosResponse<UserChatModel> = yield axios.post(
                `http://localhost:3001/api/chats/create`, 
                actionPayload
            )
            
            if(response && response.status === 201) {
                yield put(
                    completedCreateNewChatroomAction({
                        status: 'success', 
                        users: [], 
                        currentChat: response.data, 
                    })
                )  
                
               yield put(
                   addUsersChatAction(response.data)
               )
            }

        } catch (error) {
            yield put(
                failServerAccessAction({
                    status: 'error', 
                    errorMsg: error.toString(), 
                    users: [],
                    currentChat: currentChat,
                }) 
            )
        }
    })
}

export function* getNeedChatSaga() {
    yield takeEvery(setChatroomAction.TYPE,
        function*(action: typeof setChatroomAction.typeOf.action){
            const actionPayload = action
            try {
                yield put(
                    startOfServerAccessAction({
                        status: 'running',
                        users: [], 
                        currentChat: currentChat,
                    })
                )
                
                const response: AxiosResponse<UserChatModel> = yield axios.get(
                    `http://localhost:3001/api/chats/get?id=${actionPayload.id}`
                );
                 
                if(response.status === 200) {
                    yield put(
                        completedGetNeedChatAction({
                            status: 'running',
                            users: [], 
                            currentChat: response.data,
                        })
                    )
                }
            } catch (error) {
                yield put(
                    failServerAccessAction({
                        status: 'error', 
                        errorMsg: error.toString(), 
                        users: [],
                        currentChat: currentChat,
                    }) 
                )
            }
        }
    )
}

export function* deleteMessageSaga () {
    yield takeEvery(deleteMessageAction.TYPE, function* (
        action: typeof deleteMessageAction.typeOf.action
    ){
        const payload = action
        try {
            yield put(
                startOfServerAccessAction({
                    status: 'running',
                    users: [], 
                    currentChat: currentChat,
                })
            )
            
            const response: AxiosResponse<UserChatModel> = yield axios.delete(
                `http://localhost:3001/api/chats/deleteMessage?chatId=${payload.chatId}&messageId=${payload.messageId}`
            )
            if(response.status === 200) {
                yield put(
                    completedDeleteMessageAction({
                        status: 'success', 
                        users: [], 
                        currentChat: currentChat,
                    }) 
                )
            }
        } catch (error) {
            yield put(
                failServerAccessAction({
                    status: 'error', 
                    errorMsg: error.toString(), 
                    users: [],
                    currentChat: currentChat,
                }) 
            )
        }
    })
}


export function* editMessageSaga () {
    yield takeEvery(editMessageAction.TYPE, function*(
        action: typeof editMessageAction.typeOf.action
    ) {
        const payload = action; 
        try {
            yield put(
                startOfServerAccessAction({
                    status: 'running',
                    users: [], 
                    currentChat: currentChat,
                })
            )
            const response: AxiosResponse<any> = yield axios.patch(
                `http://localhost:3001/api/chats/changeMessage`, 
                payload
            ); 

            if(response.status === 200) {
                yield put(
                    completedEditMessageAction({
                        status: 'success', 
                        users: [],
                        currentChat: currentChat,
                    })
                )
            }

        } catch (error) {
            yield put(
                failServerAccessAction({
                    status: 'error', 
                    errorMsg: error.toString(), 
                    users: [],
                    currentChat: currentChat,
                }) 
            ) 
        }
    })
}


function* findUserByNameSaga (action: typeof findUserByNameAction.typeOf.action ) {
    try {
        yield put(
            startOfServerAccessAction({
                status: "running", 
                users: [],
                currentChat: currentChat,
            }) 
        )
        const response: AxiosResponse<UserDataModel[]> = yield axios.get(
            `http://localhost:3001/api/user?name=${action.name}`
        );

        if(response.status === 200)  {
            yield put(
                completedGetUserByName({
                    status: "success", 
                    users: response.data, 
                   currentChat: currentChat,
                })
            )
        }   
    } catch (error) {
        yield put(
            failServerAccessAction({
                status: 'error', 
                errorMsg: error.toString(), 
                users: [],
               currentChat: currentChat,
            }) 
        )
    } 
}

export function* debounceSaga() {
    yield debounce(500, debounceUserSearchAction.TYPE, findUserByNameSaga);
}