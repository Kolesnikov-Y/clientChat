import { Action } from "redux"; 
import { UserDataModel } from "../../../pages/user/UserContainer";
import { UserStateModel } from "../../users/store/reducers";
import { completedCreateNewChatroomAction, completedGetUserByName, failServerAccessAction } from "../saga/chatsHandler";
export interface ChatUserModel {
    user: UserStateModel; 
    massage: string; 
    messageDate: Date
}


export interface InitialChatModel {
    status: "initial" | "success" | 'error' | "running";
    users: UserDataModel[]; 
    chatId?: string; 
    errorMsg?: string; 
}


const initialState: InitialChatModel = {
    status: 'initial',
    chatId: "",
    users: []
}

export function UserChatReducer (state: InitialChatModel = initialState, action: Action) {

    if(completedGetUserByName.is(action)){
        return {
            ...state,
            status: action.status, 
            users: [...action.users]
        }
    }

    if(failServerAccessAction.is(action)){
        return {
            ...state, 
            status: action.status, 
            errorMsg: action.errorMsg
        }
    }

    if(completedCreateNewChatroomAction.is(action)){
        return {
            ...state, 
            status: action.status, 
            chatId: action.chatId
        }
    }

    return state
} 