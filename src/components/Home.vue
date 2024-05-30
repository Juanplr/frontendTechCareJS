<script>

import { ref, onMounted} from "vue";
import { reactive } from 'vue';
import axios from "axios";
import {useRouter } from 'vue-router';
import {sessionTimeout} from "@/const/constantes.js";
import {get_session_time} from "@/Funtionsjs/funtions.js";


export default {
  setup() {
    const url = "http://localhost:3000/api/orden_servicio/";
    const router = useRouter();
    const id_orden_de_servicio_find = ref("");
    const formData = reactive({
      id_orden_de_servicio: ""
    });

    const go_to_Formulario_orden = () => {
      console.log('Formulario enviado', formData.id_orden_de_servicio);
      router.push('/formularioOrden'); 
    };

    const go_to_cierre_orden = async () =>{
      const id = parseInt(id_orden_de_servicio_find.value);
     
      if (!id_orden_de_servicio_find.value || isNaN(id) || id<1){
        alert("por favor ingrese una orden de servicio valido")
      } else{
        try {
      const existe = await peticion_orden_existe(id);
      if (existe) {
        router.push(`/cierreOrden/${id}`);
      } else {
        alert("Por favor ingrese una orden de servicio válida");
      }
    } catch (error) {
      console.error('Error verificando la orden de servicio:', error);
      alert("Ocurrió un error al verificar la orden de servicio");
    }
       
      }
        
    }

    const peticion_orden_existe = async (id) => {
  try {
    const response = await axios.get(`${url}existe/${id}`);
    return response.data !== false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
    
    onMounted(() => {
      get_session_time(sessionTimeout, router);
    })

    return { go_to_Formulario_orden, go_to_cierre_orden, formData, id_orden_de_servicio_find, peticion_orden_existe };

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

   
  </div>
</template>


<style>
@import "@/assets/Home.css";
</style>
