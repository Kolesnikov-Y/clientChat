import { Action } from "redux"; 
import { UserDataModel } from "../../../pages/user/UserContainer";
import { UserStateModel } from "../../users/store/reducers";
import { completedCreateNewChatroomAction, completedGetUserByName, failServerAccessAction } from "../saga/chatsHandler";
import { setChatroomAction } from "./actions";
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
    isChatConnected: boolean
}


const initialState: InitialChatModel = {
    status: 'initial',
    chatId: "",
    users: [], 
    isChatConnected: false,
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

    if(setChatroomAction.is(action)){
        return {
            ...state, 
            chatId: action.id
        }
    }

    if(action.type === 'CHATROOM_CONNECTED'){
        return {
            ...state, 
            isChatConnected: true
        }
    }
    
    if(action.type === 'CHATROOM_DISCONNECTED'){
        return {
            ...state, 
            isChatConnected: false 
        }
    }

    return state
} 