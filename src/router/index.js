import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Home from '../components/Home.vue';
import FormularioOrden from '../components/FormularioOrden.vue';
import CierreDeOrden from '../components/CierreDeOrden.vue';


const routes = [
    { path: '/', component: Login },
    { path: '/home', component: Home },
    { path: '/formularioOrden', component: FormularioOrden },
    { path: '/cierreOrden/:id', component: CierreDeOrden, props: true }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;