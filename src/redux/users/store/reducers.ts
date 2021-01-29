import { Action } from "redux"; 
import { getUserInfoAction } from "./actions";

export interface UserStateModel {
    name: string; 
    email: string;
    id?: string;
    chats?: [];
    age?: number;
    gender?: "male" | "female";
    phone?: string;
    contacts?: [];

}


const initialState: UserStateModel = {
    name: '', 
    email: '', 
    age: 0, 

}

export function UserReducer (state: UserStateModel = initialState, action: Action) {

    if(getUserInfoAction.is(action)){
        return {
            ...state, 
           ...action
        }
    }

    return state
} 