import { defineAction } from "rd-redux-utils";
import { RequestCreateChatModel, RequestDeleteMessageModel, RequestEditMessageModel } from "../../../model";

export const getChatInfo = defineAction('GET_CHAT_INFO');
export const sendMessageAction = defineAction('SEND_MESSAGE_ACTION'); 

export const findUserByNameAction = defineAction<{name: string}>('FIND_USER_BY_NAME'); 
export const debounceUserSearchAction = defineAction<{name: string}>('DEBOUNCE_USER_SEARCH'); 

export const setChatroomAction = defineAction<{id: string}>("SET_CHATROOM");
export const createNewChatAction = defineAction<RequestCreateChatModel>('CREATE_NEW_CHATROOM'); 

export const deleteMessageAction = defineAction<RequestDeleteMessageModel>("MESSAGE/DELETE_MESSAGE");
export const editMessageAction = defineAction<RequestEditMessageModel>("MESSAGE/EDIT_MESSAGE");
