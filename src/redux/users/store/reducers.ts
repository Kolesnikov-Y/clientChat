import { Action } from "redux"; 
import { ChangeFieldsModel } from "../../../model/request/requestChangeUserData.model";
import { UserDataModel } from "../../../pages/user/UserContainer";
import { completedChangeUserDataAction, completedGetUserAction, userFailedAccessAction, userStartOfServerAccessAction } from "../saga/userHandler";

export interface UserStateModel {
    status: "initial" | "success" | 'error' | "running";
    userInfo: UserDataModel;
    errorMsg?: string;
    payload?: ChangeFieldsModel
}


const initialState: UserStateModel = {
    userInfo: {
        name: '', 
        email: '', 
        id: '', 
        chats: [], 
        age: 0, 
        gender: 'male', 
        phone: '',
        contacts: [],
    },
    status: "initial", 
    payload: undefined
}

export function UserReducer (state: UserStateModel = initialState, action: Action) {

    if(completedGetUserAction.is(action)){
        return {
            ...state, 
           userInfo: {...action.userInfo}, 
           status: action.status
        }
    }

    if(userStartOfServerAccessAction.is(action)) {
        return {...state, 
            status: action.status
        }
    }

    if(userFailedAccessAction.is(action)){
        return {
            ...state, 
            status: action.status, 
            errorMsg: action.errorMsg
        }
    }

    if(completedChangeUserDataAction.is(action)){
        return {
            ...state, 
            status: action.status,
            userInfo: {...state.userInfo, ...action.payload}
        }
    }

    return state
} 