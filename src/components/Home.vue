<script>
<<<<<<< HEAD
import { ref } from "vue";
import { reactive } from 'vue';
import axios from "axios";
import {useRouter} from 'vue-router';
=======
import { useRouter } from 'vue-router';
import { ref } from 'vue';
>>>>>>> d6004334fb3cdbcb12d4cdb0dcf79cafeb1dd7f0

export default {
  setup() {
    const router = useRouter();
<<<<<<< HEAD
    const id_orden_de_servicio_find = ref("");
    const formData = reactive({
      id_orden_de_servicio: ""
    });

    const go_to_Formulario_orden = () => {
      console.log('Formulario enviado', formData.id_orden_de_servicio);
      router.push('/formularioOrden'); 
    };

    const go_to_cierre_orden = () =>{
      const id = parseInt(id_orden_de_servicio_find.value);
     
      if (!id_orden_de_servicio_find.value || isNaN(id) || id<1){
        alert("por favor ingrese una orden de servicio valido")
        return
      }

        
        router.push('/cierreOrden');
      
      
    };

    return { go_to_Formulario_orden, go_to_cierre_orden, formData, id_orden_de_servicio_find};
=======
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
>>>>>>> d6004334fb3cdbcb12d4cdb0dcf79cafeb1dd7f0
  },
};
</script>


<template>
  <div>
    <div class="header">
<<<<<<< HEAD
      <button class="search" v-on:click="go_to_cierre_orden()">Buscar Orden de Servicio</button>
      <input class="id" type="text" v-model="id_orden_de_servicio_find" />
      <button type="button"class="search" v-on:click="go_to_Formulario_orden()">Nueva Orden de Servicio</button>
=======
      <button type="button" class="search" v-on:click="buscarOrdenServicio">Buscar Orden de Servicio</button>
      <input class="id" type="text" />
      <button type="button" class="search" v-on:click="go_to_Formulario_orden">Nueva Orden de Servicio</button>
>>>>>>> d6004334fb3cdbcb12d4cdb0dcf79cafeb1dd7f0
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
