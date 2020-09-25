import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ( /* webpackChunkName: "home" */ '../views/login.vue'),
        meta: {
            title: '注册/登入'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ( /* webpackChunkName: "home" */ '../views/register.vue'),
        meta: {
            title: '注册/登入'
        }
    },
    {
        path: '/promoterList',
        name: 'promoterList',
        component: () =>
            import ( /* webpackChunkName: "home" */ '../views/promoterList.vue'),
        meta: {
            title: '推广员'
        }
    }
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router