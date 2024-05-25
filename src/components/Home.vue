<script>

import { ref } from "vue";
import { reactive } from 'vue';
import axios from "axios";
import {useRouter} from 'vue-router';


export default {
  setup() {
    const router = useRouter();
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

  },
};
</script>


<template>
  <div>
    <div class="header">
      <button class="search" v-on:click="go_to_cierre_orden()">Buscar Orden de Servicio</button>
      <input class="id" type="text" v-model="id_orden_de_servicio_find" />
      <button type="button"class="search" v-on:click="go_to_Formulario_orden()">Nueva Orden de Servicio</button>
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
