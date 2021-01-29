export interface RequestSetUserInfoModel {
    name: string;
    email: string;
    id?: string;
    chats?: [];
    age?: number;
    gender?: "male" | "female";
    phone?: string;
    contacts?: [];
    
}