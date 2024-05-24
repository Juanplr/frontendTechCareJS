<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  setup() {
    const router = useRouter();
    const notificationVisible = ref(false);

    const go_to_Formulario_orden = () => {
      router.push("/formularioOrden");
    };

    const buscarOrdenServicio = () => {
      const inputId = document.querySelector('.id').value.trim();

      // Validar que el campo de entrada no esté vacío
      if (inputId === '') {
        mostrarNotificacion();
        return;
      }

      // Realizar la acción de búsqueda de la orden de servicio
      // Aquí puedes agregar la lógica para buscar la orden de servicio con el ID proporcionado
    };

    const mostrarNotificacion = () => {
      notificationVisible.value = true;
      setTimeout(() => {
        notificationVisible.value = false;
      }, 3000);
    };

    return { go_to_Formulario_orden, buscarOrdenServicio, notificationVisible };
  },
};
</script>

<template>
  <div>
    <div class="header">
      <button type="button" class="search" v-on:click="buscarOrdenServicio">Buscar Orden de Servicio</button>
      <input class="id" type="text" />
      <button type="button" class="search" v-on:click="go_to_Formulario_orden">Nueva Orden de Servicio</button>
    </div>
    <div class="container_image">
      <img class="image_logo" src="/Techcare_Claro.jpeg"/>
    </div>
    <div class="chat_container">
      <div class="chat_bubble">
        <p>Hola, ¿en qué puedo ayudarte?</p>
      </div>
    </div>

    <transition name="fade">
      <div v-if="notificationVisible" class="notification">
        <i class="fas fa-exclamation-circle"></i>
        Por favor, ingrese el ID de la orden de servicio.
      </div>
    </transition>
  </div>
</template>


<style>
@import "@/assets/Home.css";
</style>
