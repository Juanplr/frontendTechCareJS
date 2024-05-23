<script>
// En App.vue
import { ref } from "vue";
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
    
    
    const login = () => {
      const sesion = {
        "nombre": formData.nombre,
        "contrasena": formData.contrasena
      }

      axios
        .post(`${URL}user/loging`, sesion 
        )
        .then((response) => {
          if (response.data == false) {
            console.log("Error");
          } else {
            console.log("Welcome");
            router.push("/home");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    return { formData, login };
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
            <label>Nombre de usuario o contraseña incorrectos</label>
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
            <label>Nombre de usuario o contraseña incorrectos</label>
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
