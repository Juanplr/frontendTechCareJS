
import Login from '@/components/Login.vue';
import { createRouter, createWebHistory } from 'vue-router';

const history = new createWebHistory();

const router = createRouter({
    history,
    routes:[
        {path:'/', component: Login},
        {path:'/home', component: () => import('@/components/Home.vue')},
    ]
})

export default router;