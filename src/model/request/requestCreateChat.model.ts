import { MessageModel } from "../../pages/ChatContainer";

export interface ChatTitleModel {
    userId: string; 
    userName: string; 
}

export interface RequestCreateChatModel {
    userEmail?: string;
    chatTitle: ChatTitleModel[];
    messages: MessageModel[];
}