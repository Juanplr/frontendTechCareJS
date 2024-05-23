<script>
import {useRouter} from 'vue-router';

export default{
  setup(){
    const router = useRouter();

    const go_to_Formulario_orden = () =>{
      router.push("/formularioOrden");
    };

    return {go_to_Formulario_orden};
  },
};
</script>

<template>
  <div>
    <div class="header">
      <button class="search">Buscar Orden de Servicio</button>
      <input class="id" type="text" />
      <button type="button" class="search" v-on:click="go_to_Formulario_orden()">Nueva Orden de Servicio</button>
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
