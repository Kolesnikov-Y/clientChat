import { ChatTitleModel } from "..";
import { MessageModel } from "../../pages/chat/ChatContainer";

export interface ResponseCreateChatModel {
    chatId: string; 
    chatTitle: ChatTitleModel[];
    messages: MessageModel[];
}