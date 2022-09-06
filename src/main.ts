import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import Card from "./components/Hello.vue"

createApp(App)
    .component("Card", Card)
    .mount('#app')
