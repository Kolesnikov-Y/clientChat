import { ResponseCreateChatModel } from "..";
import { ChangeFieldsModel } from "../request/requestChangeUserData.model";

export interface ResponseChangeUserDataModel extends ChangeFieldsModel { 
    chats?: ResponseCreateChatModel[]
} 

