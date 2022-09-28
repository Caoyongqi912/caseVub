import '@ant-design-vue/pro-layout/dist/style.css';
import 'ant-design-vue/dist/antd.variable.min.css';

import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";
import {globalAxios} from './requests'
import store from "./store";
import ProLayout, {PageContainer} from '@ant-design-vue/pro-layout';

createApp(App)
    .use(globalAxios)
    .use(ConfigProvider)
    .use(ProLayout)
    .use(PageContainer)
    .use(router)
    .use(store)
    .mount('#app')
