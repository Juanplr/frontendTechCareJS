<script>
import { reactive, ref} from 'vue';
import {useRouter } from 'vue-router';
import {defineComponent, toRefs, onMounted} from 'vue';
import axios from "axios";
import {get_session_time} from "@/Funtionsjs/funtions.js";
import {sessionTimeout} from "@/const/constantes.js";
export default defineComponent({

  name: 'CierreDeOrden',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
   setup(props) {
    const { id } = toRefs(props);
    
    const formData = reactive({
      nombre_Cliente: '',
      presupuesto: '',
      anticipo: '',
      restante: '',
      acciones_realizadas: '',
      recomendaciones: '',
      observaciones: ''
    });

    const form_orden = reactive({
      id_orden_servicio: '',
      acciones_realizadas: '',
      recomendaciones: '',
      observaciones:  '',
      estado: 'finalizada'
    });

    const router = useRouter();
    const numeroOrden = ref(null);
    const errors = reactive({});
    const showNotification = ref(false);

    const validarFormulario = () => {
      let esValido = true;
      errors.nombre_Cliente = '';
      errors.presupuesto = '';
      errors.anticipo = '';
      errors.restante = '';
      errors.acciones_realizadas = '';
      errors.recomendaciones = '';
      errors.observaciones = '';

     /* if (!formData.nombreCliente) {
        errors.nombreCliente = 'El nombre del cliente es obligatorio.';
        esValido = false;
      }

      if (!formData.servicioBrindado) {
        errors.servicioBrindado = 'El servicio brindado es obligatorio.';
        esValido = false;
      }

      if (!formData.anticipo || isNaN(formData.anticipo)) {
        errors.anticipo = 'El anticipo es obligatorio y debe ser un número.';
        esValido = false;
      }

      if (!formData.restante || isNaN(formData.restante)) {
        errors.restante = 'El restante es obligatorio y debe ser un número.';
        esValido = false;
      }*/

      if (!formData.acciones_realizadas) {
        errors.acciones_realizadas = 'Las acciones realizadas son obligatorias.';
        esValido = false;
      }

      if (!formData.recomendaciones) {
        errors.recomendaciones = 'Las recomendaciones son obligatorias.';
        esValido = false;
      }

      if (!formData.observaciones) {
        errors.observaciones = 'Las conclusiones son obligatorias.';
        esValido = false;
      }

      return esValido;
    };


    const llenado_de_orden = () => {
      let resto = null;
      const url = `http://localhost:3000/api/orden_servicio/${id.value}`;
      axios.get(url)
      .then(response => {
        if(response.data != null){
          resto = response.data.monto_total - response.data.anticipo;
          numeroOrden.value = response.data.id_orden_servicio;
          formData.nombre_Cliente = response.data.nombre_Cliente;
          formData.presupuesto = response.data.presupuesto;
          formData.anticipo = `Anticipo: $`+response.data.anticipo;
          formData.restante = `Restante: $`+resto;
        }
      })
      .catch(error => {
        console.error(error);
      });
    };

    const finalizar_orden = (event) => {
      event.preventDefault();
      if (!validarFormulario()) {
        showNotification.value = true;
        setTimeout(() => {
          showNotification.value = false;
        }, 3000);
        return;
      }

      actulizacion_orden();
      
    };

    const actulizacion_orden = () =>{
      form_orden.id_orden_servicio = parseInt(id.value);
      form_orden.acciones_realizadas = formData.acciones_realizadas;
      form_orden.recomendaciones = formData.recomendaciones;
      form_orden.observaciones = formData.observaciones;
      const url = "http://localhost:3000/api/orden_servicio";
      console.log(form_orden);
      axios.put(url, form_orden)
      .then(response => {
        if(response.data != null){
          console.log(response.data);
          alert("orden de servicio terminada")
          router.push('/home');
        }
      })
      .catch(error => {
        console.error(error);
      });
    };

    onMounted(() => {
      get_session_time(sessionTimeout, router);
      llenado_de_orden();
    })



    return { formData, form_orden, errors, showNotification, finalizar_orden, numeroOrden };
  }
});
</script>

<template>
  <div class="container_nav">
            <h6 id="h_No">No. de Orden:{{ numeroOrden }}</h6>
            <h6 id="h_titulo">Cierre de Orden de Servicio</h6>
        </div>
    <div class="container_c">
        <div class="form_principal">
            <form class="form_orden" @submit="generarOrden">
                <div class="container_left">
                    <ul class="ul_left">
                        <li class="li_left">
                            <input type="text" class="input_text_line" disabled v-model="formData.nombre_Cliente"/>
                            <span class="error-message" v-if="errors.nombre_Cliente">{{ errors.nombre_Cliente }}</span>
                        </li>
                        <li class="li_left">
                            <input type="text" class="input_text_line" disabled v-model="formData.presupuesto"/>
                            <span class="error-message" v-if="errors.presupuesto">{{ errors.presupuesto }}</span>
                        </li>
                        <li class="li_left">
                            <input type="text" class="input_text_line" disabled v-model="formData.anticipo"/>
                            <span class="error-message" v-if="errors.anticipo">{{ errors.anticipo }}</span>
                        </li>
                        <li class="li_left">
                            <input type="text" class="input_text_line" disabled v-model="formData.restante"/>
                            <span class="error-message" v-if="errors.restante">{{ errors.restante }}</span>
                        </li>
                        <li class="li_left">
                            <h6 class="h_left">Acciones realizadas en el servicio</h6>
                            <textarea class="input_text" v-model="formData.acciones_realizadas"></textarea>
                            <span class="error-message" v-if="errors.acciones_realizadas">{{ errors.acciones_realizadas }}</span>
                        </li>
                        <li class="li_left">
                            <h6 class="h_left">Recomendaciones</h6>
                            <textarea class="input_text" v-model="formData.recomendaciones"></textarea>
                            <span class="error-message" v-if="errors.recomendaciones">{{ errors.recomendaciones }}</span>
                        </li>
                    </ul>
                </div>
                    <ul class="ul_right">
                        <li class="conclusiones">
                            <h6>Conclusiones del Servicio</h6>
                            <textarea class="input_text" v-model="formData.observaciones"></textarea>
                            <span class="error-message" v-if="errors.observaciones">{{ errors.observaciones }}</span>
                        </li>
                        <div class="button">
                            <button id="btn_orden" type="submit" v-on:click="finalizar_orden">Finalizar Orden</button>
                        </div>
                    </ul>
            </form>
        </div>
    </div>
    <transition name="fade">
        <div v-if="showNotification" class="notification">
            <i class="fas fa-exclamation-circle"></i>
            Corrija los campos necesarios
        </div>
    </transition>
</template>


<style>
@import "../assets/CierreDeOrden.css";
</style>