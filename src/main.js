import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Asumiendo que tienes un router definido
import '@fortawesome/fontawesome-free/css/all.css'; // Importa los estilos de Font Awesome

createApp(App).use(router).mount('#app');
