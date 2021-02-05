import { defineAction } from "rd-redux-utils";
import { RequestAddUsersChatModel, RequestGetUserByIdModel } from "../../../model";
import { RequestChangeUserDataModel } from "../../../model/request/requestChangeUserData.model";

export const getUserInfoAction = defineAction<RequestGetUserByIdModel>('SET_USER_INFO'); 
export const addUsersChatAction = defineAction<RequestAddUsersChatModel>('ADD_USERS_CHAT'); 