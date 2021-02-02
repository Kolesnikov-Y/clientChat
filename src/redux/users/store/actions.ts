import { defineAction } from "rd-redux-utils";
import { RequestGetUserByIdModel } from "../../../model";
import { RequestChangeUserDataModel } from "../../../model/request/requestChangeUserData.model";

export const getUserInfoAction = defineAction<RequestGetUserByIdModel>('SET_USER_INFO'); 
export const changeUserDataAction = defineAction<RequestChangeUserDataModel>('CHANGE_USER_DATA'); 