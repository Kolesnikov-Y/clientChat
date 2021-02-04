import axios, { AxiosResponse } from "axios";
import { defineAction } from "rd-redux-utils"
import { debounce, put, takeEvery } from "redux-saga/effects"
import { RequestCreateChatModel } from "../../../model";
import { UserDataModel } from "../../../pages/user/UserContainer";
import { changeUserDataAction } from "../../users/store/actions";
import { createNewChatAction, debounceUserSearchAction, findUserByNameAction } from "../store/actions"
import { InitialChatModel } from "../store/reducers"

export const startOfServerAccessAction = defineAction<InitialChatModel>("START_OF_SERVER_ACCESS"); 
export const failServerAccessAction = defineAction<InitialChatModel>("FAIL_OF_SERVER_ACCESS"); 
export const completedGetUserByName = defineAction<InitialChatModel>('COMPLETED_GET_FEATURE_BY_NAME'); 
export const completedCreateNewChatroomAction = defineAction<InitialChatModel>("COMPLETED_CREATE_NEW_CHATROOM_ACTION"); 


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
                    isChatConnected: false
                })
            )
            
            const response: AxiosResponse<string> = yield axios.post(
                `http://localhost:3001/api/chats/create`, 
                actionPayload
            );

            console.log(response.data);
            
            if(response.status === 201) {
                yield put(
                    completedCreateNewChatroomAction({
                        status: 'success', 
                        users: [], 
                        chatId: response.data, 
                        isChatConnected: false,
                    })
                )

                // if(actionPayload.userEmail !== undefined) {
                //     yield put(
                //         changeUserDataAction({
                //             email: actionPayload.userEmail, 
                //             changeFields: {
                //                 chats: [response.data, ...chats]
                //             }
                //         })
                //     )
                // }
            }

        } catch (error) {
            yield put(
                failServerAccessAction({
                    status: 'error', 
                    errorMsg: error.toString(), 
                    users: [],
                    isChatConnected: false, 
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
                isChatConnected: false, 
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
                    isChatConnected: false,
                })
            )
        }   
    } catch (error) {
        yield put(
            failServerAccessAction({
                status: 'error', 
                errorMsg: error.toString(), 
                users: [],
                isChatConnected: false,
            }) 
        )
    } 
}

export function* debounceSaga() {
    yield debounce(500, debounceUserSearchAction.TYPE, findUserByNameSaga);
}