// @ts-ignore
import storages from 'store'
import {ActionContext} from "vuex";
import {AllState} from "../index";
import {LoginFrom} from "../../types/api/login";
import {getCurrentUserInfo, login} from "../../api/user";
import {message} from 'ant-design-vue'

export type UserState = {
    token: string,
    id: number,
    uid: string,
    phone: string,
    tag: string,
    create_time: string,
    update_time: string,
    username: string,
    departmentID: number,
    email: string,
    gender: string,
    avatar: string | null,
    isAdmin: boolean,
}


const state: UserState = {
    token: storages.get("token"),
    id: -1,
    uid: "",
    phone: "",
    tag: "",
    gender: "",
    create_time: "",
    update_time: "",
    email: "",
    username: "",
    departmentID: -1,
    avatar: "",
    isAdmin: false


}

const user = {
    namespaced: true,
    state,
    mutations: {
        setToken(state: UserState, token: string) {
            state.token = token
        },
        setUserInfo(state: UserState, info: UserState) {
            state.username = info.username
            state.avatar = info.avatar
            state.isAdmin = info.isAdmin
            state.id = info.id
            state.uid = info.uid
            state.gender = info.gender
            state.departmentID = info.departmentID
            state.tag = info.tag
            state.create_time = info.create_time
            state.update_time = info.update_time
            state.email = info.email
            state.phone = info.phone


        },
        clearState(state: UserState) {
            state.username = ""
        }

    },
    actions: {
        login(context: ActionContext<UserState, AllState>, params: LoginFrom) {
            return new Promise((resolve, reject) => {
                login(params).then(res => {
                    const data = res.data
                    storages.set("token", data.token)
                    context.commit("setToken", data.token)
                    resolve(data)
                }).catch(e => {
                    reject(e)
                })
            })
        },
        userinfo(context: ActionContext<UserState, AllState>) {
            return new Promise((resolve, reject) => {
                getCurrentUserInfo().then(res => {
                    const data = res.data
                    context.commit("setUserInfo", data)
                    resolve(data)
                }).catch(err => {
                    message.error(err.msg)
                    reject(err)

                })
            })
        }
    },


}
export default user