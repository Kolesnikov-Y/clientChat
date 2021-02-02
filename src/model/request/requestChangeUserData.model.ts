import { RequestCreateChatModel } from "..";
import { UserContactsModel } from "../../pages/user/UserContainer";

export interface ChangeFieldsModel {
    name?: string;
    password?: string;
    email?: string;
    id?: string;
    chats?: RequestCreateChatModel[];
    age?: number;
    gender?: "male" | "female";
    phone?: string;
    contacts?: UserContactsModel[]
}

export interface RequestChangeUserDataModel {
    email: string; 
    changeFields: ChangeFieldsModel
}