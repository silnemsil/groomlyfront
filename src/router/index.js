import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import RegisterCustomerView from '@/views/RegisterCustomerView.vue'
import RegisterGroomerView from '@/views/RegisterGroomerView.vue'
import ErrorView from "@/views/ErrorView.vue";
import GroomersView from "@/views/GroomersView.vue";
import GroomerDetailView from "@/views/GroomerDetailView.vue";
import CheckoutView from "@/views/CheckoutView.vue";

const routes = [
    {
        path: '/',
        name: 'homeRoute',
        component: HomeView
    },
    {
        path: '/error',
        name: 'errorRoute',
        component: ErrorView
    },
    {
        path: '/login',
        name: 'loginRoute',
        component: LoginView
    },
    {
        path: '/groomers',
        name: 'groomersRoute',
        component: GroomersView
    },
    {
        path: '/register-customer',
        name: 'registerCustomerRoute',
        component: RegisterCustomerView
    },
    {
        path: '/register-groomer',
        name: 'registerGroomerRoute',
        component: RegisterGroomerView
    },
    {
        path: '/groomer',
        name: 'groomerRoute',
        component: GroomerDetailView
    },
    {
        path: '/checkout',
        name: 'checkoutRoute',
        component: CheckoutView
    },
    {
        path: '/support',
        name: 'supportRoute',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
            return import(/* webpackChunkName: "about" */ '../views/CustomerSupportView.vue')
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
