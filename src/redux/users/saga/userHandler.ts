import { defineAction } from "rd-redux-utils";
import { UserStateModel } from "../store/reducers";
import { put, takeEvery } from "redux-saga/effects";
import { addUsersChatAction, getUserInfoAction } from "../store/actions";
import axios, { AxiosResponse } from "axios";
import { RequestGetUserByIdModel, ResponseGetUserModel , ResponseChangeUserDataModel, RequestAddUsersChatModel} from "../../../model";
import { RequestChangeUserDataModel } from "../../../model/request/requestChangeUserData.model";

export const userStartOfServerAccessAction = defineAction<UserStateModel>("USER/START_OF_SERVER_ACCESS");
export const completedGetUserAction = defineAction<UserStateModel>("USER/GET_USER"); 
export const userFailedAccessAction = defineAction<UserStateModel>("USER/FAILED_ACCESS");
export const completedChangeUserDataAction = defineAction<UserStateModel>("USER/COMPLETED_ADD_TO_USER_CHATS");

const mockUserInfo = {
    name: '', 
    email: '', 
    id: '', 
    chats: [], 
    age: 0, 
    gender: 'male', 
    phone: '',
    contacts: [],
}

export function* changeUserDataSaga () {
    yield takeEvery(addUsersChatAction.TYPE, function* (
        action: typeof addUsersChatAction.typeOf.action
    ){
        let addData: RequestAddUsersChatModel = action;
        try {
            yield put(
                userStartOfServerAccessAction({
                    status: 'running', 
                    userInfo: mockUserInfo
                })
            )

            const response: AxiosResponse<ResponseChangeUserDataModel> = yield axios.patch(
                `http://localhost:3001/api/user/addChatToUsers`, addData
             );

             if(response.status === 200) {
                 yield put(
                    completedChangeUserDataAction({
                        status: 'success',
                        payload: response.data, 
                        userInfo: mockUserInfo
                    }
                        )
                 )
             }
            
        } catch (error) {
                  yield put(
                userFailedAccessAction({
                    status: 'error', 
                    errorMsg:  error.toString(), 
                    userInfo: mockUserInfo
                })
            )
        }
    })
}

export function* getUserSaga() {
    yield takeEvery(getUserInfoAction.TYPE, function* (
        action: typeof getUserInfoAction.typeOf.action
    ) {
        try {
            const actionModel: RequestGetUserByIdModel = action

            yield put(
                userStartOfServerAccessAction({
                    status: 'running', 
                    userInfo: mockUserInfo
                })
            ); 

            const response: AxiosResponse<ResponseGetUserModel[]> = yield axios.get(
               ` http://localhost:3001/api/user/${actionModel.id}`
            );
            
            if(response.status === 200) {
                yield put(
                    completedGetUserAction({
                        userInfo: response.data[0],
                        status: 'success'
                    })
                )
            }

        } catch (error) {
            yield put(
                userFailedAccessAction({
                    status: 'error', 
                    errorMsg:  error.toString(), 
                    userInfo: mockUserInfo
                })
            )
        }
    })
}