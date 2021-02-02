import { defineAction } from "rd-redux-utils";
import { UserStateModel } from "../store/reducers";
import { put, takeEvery } from "redux-saga/effects";
import { changeUserDataAction, getUserInfoAction } from "../store/actions";
import axios, { AxiosResponse } from "axios";
import { RequestGetUserByIdModel, ResponseGetUserModel , ResponseChangeUserDataModel} from "../../../model";
import { RequestChangeUserDataModel } from "../../../model/request/requestChangeUserData.model";

export const userStartOfServerAccessAction = defineAction<UserStateModel>("USER/START_OF_SERVER_ACCESS");
export const completedGetUserAction = defineAction<UserStateModel>("USER/GET_USER"); 
export const userFailedAccessAction = defineAction<UserStateModel>("USER/FAILED_ACCESS");
export const completedChangeUserDataAction = defineAction<UserStateModel>("USER/COMPLETED_ADD_TO_USER_CHATS");


export function* changeUserDataSaga () {
    yield takeEvery(changeUserDataAction.TYPE, function* (
        action: typeof changeUserDataAction.typeOf.action
    ){
        let addData: RequestChangeUserDataModel = action;
        try {
            yield put(
                userStartOfServerAccessAction({
                    status: 'running', 
                    userInfo: {
                        name: '', 
                        email: '', 
                        id: '', 
                        chats: [], 
                        age: 0, 
                        gender: 'male', 
                        phone: '',
                        contacts: [],
                    }
                })
            )

            const response: AxiosResponse<ResponseChangeUserDataModel> = yield axios.patch(
                `http://localhost:3001/api/user/changeData`, addData
             );

             if(response.status === 200) {
                 yield put(
                    completedChangeUserDataAction({
                        status: 'success',
                        payload: response.data, 
                        userInfo: {
                            name: '', 
                            email: '', 
                            id: '', 
                            chats: [], 
                            age: 0, 
                            gender: 'male', 
                            phone: '',
                            contacts: [],
                        }
                    }
                        )
                 )
             }
            
        } catch (error) {
                  yield put(
                userFailedAccessAction({
                    status: 'error', 
                    errorMsg:  error.toString(), 
                    userInfo: {
                        name: '', 
                        email: '', 
                        id: '', 
                        chats: [], 
                        age: 0, 
                        gender: 'male', 
                        phone: '',
                        contacts: [],
                    }
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
                    userInfo: {
                        name: '', 
                        email: '', 
                        id: '', 
                        chats: [], 
                        age: 0, 
                        gender: 'male', 
                        phone: '',
                        contacts: [],
                    }
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
                    userInfo: {
                        name: '', 
                        email: '', 
                        id: '', 
                        chats: [], 
                        age: 0, 
                        gender: 'male', 
                        phone: '',
                        contacts: [],
                    }
                })
            )
        }
    })
}