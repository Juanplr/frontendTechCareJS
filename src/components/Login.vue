<script>
import { ref, onMounted, ErrorCodes } from "vue";
import axios from "axios";
import {useRouter} from 'vue-router';
import { reactive } from 'vue';

export default {
  setup() {
    const router = useRouter();
    const URL = "http://localhost:3000/api/";
    const formData = reactive({
      nombre: '',
      contrasena: ''
    });
    
    const isVisibleContrasena = ref(true);
    const isVisibleUsuario = ref(true);
    const textContrasena = ref("");
    const textUsuario = ref("");

    const login = () => {
      const sesion = {
        "nombre": formData.nombre,
        "contrasena": formData.contrasena
      }
      if(sesion.nombre && sesion.contrasena){
        axios
        .post(`${URL}user/loging`, sesion 
        )
        .then((response) => {
          if (response.data == false) {
            console.log("Error");
          } else {
            console.log(response.data)
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("nombre", response.data.user.nombre);
            localStorage.setItem("roll", response.data.user.roll);
            router.push("/home");
          }
        })
        .catch((error) => {
          console.error(error);
          if(error.message == "Request failed with status code 400"){
            isVisibleContrasena.value = true;
            textContrasena.value = "La contraseña deben ser 8 caracteres"
            isVisibleUsuario.value = false;
          }
          if(error.message == "Request failed with status code 404"){
            isVisibleContrasena.value = true;
            textContrasena.value = "Usuario o Contraseña Incorrectos"
            isVisibleUsuario.value = true;
            textUsuario.value = "Usuario o Contraseña Incorrectos"
          }
        });
      }else{
       if(!sesion.nombre && !sesion.contrasena){
        isVisibleUsuario.value = true;
        textUsuario.value = "Favor de agregar el Username";
        isVisibleContrasena.value = true;
        textContrasena.value = "Favor de agregar la Contraseña";
       }else{
        if(!sesion.nombre){
          isVisibleUsuario.value = true;
          textUsuario.value = "Favor de agregar el Username";
          isVisibleContrasena.value = false;
        }
        if(!sesion.contrasena){
          isVisibleContrasena.value = true;;
          textContrasena.value = "Favor de agregar la Contraseña";
          isVisibleUsuario.value = false;
        }
       }
      }
    };
    onMounted(() => {
      if (localStorage.getItem("token")) {
        router.push("/home");
      }else{
        router.push("/");
      }
    })

    return { formData, login, isVisibleContrasena, isVisibleUsuario, textContrasena,textUsuario };
  },
};
</script>

<template>
  <div class="container">
    <div class="screen">
      <div class="screen__content">
        <form class="login">
          <div class="login__field">
            <i class="login__icon fas fa-user"></i>
            <input
              type="text"
              class="login__input"
              placeholder="Username"
              v-model="formData.nombre"/>
          <div class="login__label">
            <label class="label_text" v-if="isVisibleUsuario" v-text="textUsuario"></label>
          </div>
          </div>
          <div class="login__field">
            <i class="login__icon fas fa-lock"></i>
            <input
              type="password"
              class="login__input"
              placeholder="Password"
              v-model="formData.contrasena"
            />
            <div class="login__label">
            <label class="label_text" v-if="isVisibleContrasena" v-text="textContrasena"></label>
          </div>
          </div>
          <button
            v-on:click="login()"
            type="button"
            class="button login__submit"
          >
            <span class="button__text">Inicio de sesión</span> 
            <i class="button__icon fas fa-chevron-right"></i>
          </button>
        </form>
        <div class="social-login">
          <h3>Login</h3>
          <div class="social-icons">
            <a href="#" class="social-login__icon fab fa-instagram"></a>
            <a href="#" class="social-login__icon fab fa-facebook"></a>
            <a href="#" class="social-login__icon fab fa-twitter"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "@/assets/LoginStyle.css";
</style>
