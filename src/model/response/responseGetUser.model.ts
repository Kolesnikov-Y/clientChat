import { ResponseCreateChatModel } from "..";
import { UserChatModel, UserContactsModel } from "../../pages/user/UserContainer";

export interface ResponseGetUserModel {
    name: string;
    email: string;
    id: string;
    chats: ResponseCreateChatModel[];
    age: number;
    gender: "male" | "female";
    phone: string;
    contacts: UserContactsModel[]
}