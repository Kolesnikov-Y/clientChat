import { defineAction } from "rd-redux-utils";
import { RequestSetUserInfoModel } from "../../../model";

export const getUserInfoAction = defineAction<RequestSetUserInfoModel>('SET_USER_INFO'); 