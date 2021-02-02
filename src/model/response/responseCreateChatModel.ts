import { ChatTitleModel } from "..";
import { MessageModel } from "../../pages/ChatContainer";

export interface ResponseCreateChatModel {
    chatId: string; 
    chatTitle: ChatTitleModel[];
    messages: MessageModel[];
}