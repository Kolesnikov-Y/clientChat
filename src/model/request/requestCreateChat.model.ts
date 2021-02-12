import { MessageModel } from "../../pages/chat/ChatContainer";

export interface ChatTitleModel {
    userId: string; 
    userName: string; 
}

export interface RequestCreateChatModel {
    chatId: string;
    chatTitle: ChatTitleModel[];
    messages: MessageModel[];
}