import { ChatTitleModel } from "..";
import { MessageModel } from "../../pages/chat/ChatContainer";


export interface RequestAddUsersChatModel {
    chatId: string; 
    chatTitle: ChatTitleModel[];
    messages: MessageModel[] 
 }