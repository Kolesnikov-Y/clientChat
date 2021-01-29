import { Action } from "redux"; 
import { UserStateModel } from "../../users/store/reducers";
// import { sendMessageAction } from "./actions";
export interface ChatUserModel {
    user: UserStateModel; 
    massage: string; 
    messageDate: Date
}


export interface InitialChatModel {
    chatId: string; 
    users: ChatUserModel[]
}


const initialState: InitialChatModel = {
    chatId: "",
    users: []
}

export function UserReducer (state: InitialChatModel  = initialState, action: Action) {

    // if(sendMessageAction.is(action)){
    //     return {
    //         ...state, 
    //        ...action
    //     }
    // }

    return state
} 