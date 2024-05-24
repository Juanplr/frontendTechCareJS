<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const formData = reactive({
      nombreCliente: '',
      servicioBrindado: '',
      anticipo: '',
      restante: '',
      acciones: '',
      recomendaciones: '',
      conclusiones: ''
    });

    const errors = reactive({});
    const showNotification = ref(false);

    const validarFormulario = () => {
      let esValido = true;
      errors.nombreCliente = '';
      errors.servicioBrindado = '';
      errors.anticipo = '';
      errors.restante = '';
      errors.acciones = '';
      errors.recomendaciones = '';
      errors.conclusiones = '';

      if (!formData.nombreCliente) {
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
      }

      if (!formData.acciones) {
        errors.acciones = 'Las acciones realizadas son obligatorias.';
        esValido = false;
      }

      if (!formData.recomendaciones) {
        errors.recomendaciones = 'Las recomendaciones son obligatorias.';
        esValido = false;
      }

      if (!formData.conclusiones) {
        errors.conclusiones = 'Las conclusiones son obligatorias.';
        esValido = false;
      }

      return esValido;
    };

    const generarOrden = (event) => {
      event.preventDefault();
      if (!validarFormulario()) {
        showNotification.value = true;
        setTimeout(() => {
          showNotification.value = false;
        }, 3000);
        return;
      }

      // Lógica para generar la orden de servicio
      console.log('Orden generada:', formData);
    };

    return { formData, errors, showNotification, generarOrden };
  }
};
</script>

<template>
    <div class="container_c">
        <div class="container_nav">
            <h6 id="h_No">No. de Orden #</h6>
            <h6 id="h_titulo">Cierre de Orden de Servicio</h6>
        </div>
        <div class="form_principal">
            <form class="form_orden" @submit="generarOrden">
                <div class="container_left">
                    <ul class="ul_left">
                        <li class="li_left">
                            <input type="text" class="input_text_line" placeholder="Nombre del Cliente" v-model="formData.nombreCliente"/>
                            <span class="error-message" v-if="errors.nombreCliente">{{ errors.nombreCliente }}</span>
                        </li>
                        <li class="li_left">
                            <input type="text" class="input_text_line" placeholder="Servicio Brindado" v-model="formData.servicioBrindado"/>
                            <span class="error-message" v-if="errors.servicioBrindado">{{ errors.servicioBrindado }}</span>
                        </li>
                        <li class="li_left">
                            <input type="text" class="input_text_line" placeholder="Anticipo" v-model="formData.anticipo"/>
                            <span class="error-message" v-if="errors.anticipo">{{ errors.anticipo }}</span>
                        </li>
                        <li class="li_left">
                            <input type="text" class="input_text_line" placeholder="Restante" v-model="formData.restante"/>
                            <span class="error-message" v-if="errors.restante">{{ errors.restante }}</span>
                        </li>
                        <li class="li_left">
                            <h6 class="h_left">Acciones realizadas en el servicio</h6>
                            <textarea class="input_text" v-model="formData.acciones"></textarea>
                            <span class="error-message" v-if="errors.acciones">{{ errors.acciones }}</span>
                        </li>
                        <li class="li_left">
                            <h6 class="h_left">Recomendaciones</h6>
                            <textarea class="input_text" v-model="formData.recomendaciones"></textarea>
                            <span class="error-message" v-if="errors.recomendaciones">{{ errors.recomendaciones }}</span>
                        </li>
                    </ul>
                </div>
                <div class="container_right">
                    <ul class="ul_right">
                        <li class="conclusiones">
                            <h6>Conclusiones del Servicio</h6>
                            <textarea class="input_text" v-model="formData.conclusiones"></textarea>
                            <span class="error-message" v-if="errors.conclusiones">{{ errors.conclusiones }}</span>
                        </li>
                        <li class="button">
                            <button id="btn_orden" type="submit">Generar Orden</button>
                        </li>
                    </ul>
                </div>
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