import { MessageModel } from "../../pages/chat/ChatContainer";

export interface ChatTitleModel {
    userId: string; 
    userName: string; 
}

export interface RequestCreateChatModel {
    userEmail?: string;
    chatTitle: ChatTitleModel[];
    messages: MessageModel[];
}