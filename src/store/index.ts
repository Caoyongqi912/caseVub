import {createStore} from "vuex";
import user, {UserState} from "./models/user";
import storage from 'vuex'


export interface AllState {
    user: UserState
}

// 实例化
const store = createStore<AllState>({

    modules: {
        user,
    }

})

export default store
