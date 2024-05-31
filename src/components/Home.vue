<script>
import { get_session_time } from "@/Funtionsjs/funtions.js";
import Chat from '@/components/Chat.vue';
import { sessionTimeout } from "@/const/constantes.js";
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router';

export default {
  components: {
    Chat
  },setup() {
    const url = "http://localhost:3000/api/orden_servicio/";
    const router = useRouter();
    const id_orden_de_servicio_find = ref("");
    const formData = reactive({
      id_orden_de_servicio: ""
    });

    const isChatVisible = ref(false);
    const ordenes_activas = ref([]);

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

    const tabla_ordenes_activas=async()=>{
      try {
        const response = await axios.get(url);
        console.log(response.data);
        ordenes_activas.value = response.data;  // Actualiza el estado con los datos de la respuesta
      } catch (error) {
        console.error('Error obteniendo las órdenes de servicio:', error);
      }
      
    };

    const peticion_orden_existe = async (id) => {
  try {
    const response = await axios.get(`${url}existe/${id}`);
    return response.data !== false;
  } catch (error) {
    console.error(error);
    return false;
  }
  };

    const logout = () => { 
      localStorage.clear();
      router.push('/');
    };
    
    onMounted(() => {
      tabla_ordenes_activas();
      get_session_time(sessionTimeout, router);
    })
    
    const toggleChat = () => {
      isChatVisible.value = !isChatVisible.value;
    };

    return { go_to_Formulario_orden, go_to_cierre_orden, formData, id_orden_de_servicio_find, peticion_orden_existe, 
       toggleChat, isChatVisible, logout, tabla_ordenes_activas, ordenes_activas };
  }
};

</script>

<template>
  <div>
    <div class="header">
      <div class="logout">
        <button class ="logout_button" v-on:click="logout()">Cerrar sesion</button>
      </div>
      <button class="search" v-on:click="go_to_cierre_orden()">Buscar Orden de Servicio</button>
      <input class="id" type="text" v-model="id_orden_de_servicio_find" />
      <button type="button"class="search" v-on:click="go_to_Formulario_orden()">Nueva Orden de Servicio</button>
    </div>
    <div class="container_image">
      <img class="image_logo" src="/Techcare_Claro.jpeg"/>
      <div class="table_container">
        <table>
          <thead>
            <tr>
              <th>Numero de servicio</th>
              <th>Nombre del clinete</th>
              <th>Fecha de ingreso</th>
              <th>Presupuesto</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(orden, index) in ordenes_activas" :key="index">
              <td>{{ orden.id_orden_servicio }}</td>
              <td>{{ orden.nombre_Cliente }}</td>
              <td>{{ orden.fecha_de_ingreso }}</td>
              <td>{{ orden.presupuesto }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="chat_contenedor" v-if="isChatVisible">
      <Chat/>
    </div>
    <div class="chat_container">
      <div id="btn_chat" class="chat_bubble" @click="toggleChat">
        <p>Hola, ¿en qué puedo ayudarte?</p>
      </div>
    </div>
  </div>
</template>


<style>
@import "@/assets/Home.css";
</style>
