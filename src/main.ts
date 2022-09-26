import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";
import Antd from "ant-design-vue"
import {globalAxios} from './requests'
import store from "./store";

createApp(App)
    .use(globalAxios)
    .use(Antd)
    .use(router)
    .use(store)
    .mount('#app')
