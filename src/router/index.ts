import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";


const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "HomeView",
        component: () => import("../views/HomeView.vue")
    },
    {
        path: "/login",
        name: "LoginView",
        component: () => import("../views/LoginView.vue")
    },
]


const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router