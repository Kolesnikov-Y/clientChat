import { ChatTitleModel } from "..";
import { MessageModel } from "../../pages/ChatContainer";


export interface RequestAddUsersChatModel {
    chatId: string; 
    chatTitle: ChatTitleModel[];
    messages: MessageModel[] 
 }