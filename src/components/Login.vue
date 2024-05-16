<script>
// En App.vue
import { ref } from "vue";
import axios from "axios";
import {useRouter} from 'vue-router';
import { reactive } from 'vue';

export default {
  setup() {
    const router = useRouter();
    
    const login = () => {
      axios
        .get("http://localhost:3000/api/user/loging/pepe/12345678")
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

    const prueba = () => {
      console.log("Hola");
    };

    return { login, prueba };
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
              placeholder="User name / Email"
            />
          </div>
          <div class="login__field">
            <i class="login__icon fas fa-lock"></i>
            <input
              type="password"
              class="login__input"
              placeholder="Password"
            />
          </div>
          <button
            v-on:click="login()"
            type="button"
            class="button login__submit"
          >
            <span class="button__text">Log In Now</span>
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
@import "@/assets/app.css";
</style>
