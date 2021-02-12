import { Action } from "redux"; 
import { UserChatModel, UserDataModel } from "../../../pages/user/UserContainer";
import { UserStateModel } from "../../users/store/reducers";
import { completedCreateNewChatroomAction, completedDeleteMessageAction, completedEditMessageAction, completedGetNeedChatAction, completedGetUserByName, failServerAccessAction, startOfServerAccessAction } from "../saga/chatsHandler";
import { deleteMessageAction } from "./actions";

export interface ChatUserModel {
    user: UserStateModel; 
    massage: string; 
    messageDate: Date
}

export interface InitialChatModel {
    status: "initial" | "success" | 'error' | "running";
    users: UserDataModel[]; 
    currentChat: UserChatModel; 
    errorMsg?: string; 
}


const initialState: InitialChatModel = {
    status: 'initial',
    currentChat: {
        chatId: '', 
        chatTitle: [], 
        messages: []
    },
    users: [], 
}

export function UserChatReducer (state: InitialChatModel = initialState, action: Action) {

    if(startOfServerAccessAction.is(action)){
        return {
            ...state, 
            status: action.status, 
        }
    }

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
            currentChat: action.currentChat
        }
    }

    if(completedGetNeedChatAction.is(action)){
        return state = {
            ...state, 
            status: action.status,
            currentChat: action.currentChat
        }   
    }

    if(completedDeleteMessageAction.is(action)){
        return {...state, 
            status: action.status
        }
    }
    if(completedEditMessageAction.is(action)){
        return {...state, 
            status: action.status
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