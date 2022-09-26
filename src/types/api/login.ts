export interface ResponseData<T = any> {
    code: number,
    msg: string,
    data?: T
}

// 登录接口约束
export interface LoginSuccess extends ResponseData {
    token: string
}
export type LoginFrom = {
    username: string | undefined,
    password: string | undefined
}

