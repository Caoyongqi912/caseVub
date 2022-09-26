import {LoginFrom, LoginSuccess, ResponseData} from "../types/api/login";
import {AxiosResponse} from "axios";
import request from "../requests";
import {UserState} from "../store/models/user";

type ConfigType<T = ResponseData> = Promise<AxiosResponse<T>>


/**
 * login
 */
export const login = (data: LoginFrom): ConfigType<LoginSuccess> => {
    return request({
        url: "/api/user/login",
        method: "post",
        data
    })
}


/**
 * current
 */
export const getCurrentUserInfo = (): ConfigType<UserState> => {
    return request({
        url: "/api/user/current",
        method: "get",
    })
}