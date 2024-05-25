<script>
import { getFechaActual } from "@/Funtionsjs/DateFormat";
import axios from "axios";
import { reactive, ref } from 'vue';

export default {
  setup() {
    const url = "http://localhost:3000/api/";

    const formData = reactive({
      numero_de_serie: '',
      marca: '',
      modelo: '',
      estado_fisico: '',
      presupuesto: '',
      nombre_cliente: '',
      monto_total: '',
      anticipo: '',
      tipo_de_dispositivo: '',
      cargador: false
    });

    const errors = reactive({});
    const showNotification = ref(false);

    const validarFormulario = () => {
      let esValido = true;
      errors.numero_de_serie = '';
      errors.marca = '';
      errors.modelo = '';
      errors.estado_fisico = '';
      errors.presupuesto = '';
      errors.nombre_cliente = '';
      errors.monto_total = '';
      errors.anticipo = '';

      if (!formData.numero_de_serie) {
        errors.numero_de_serie = 'El número de serie es obligatorio.';
        esValido = false;
      }

      if (!formData.marca) {
        errors.marca = 'La marca es obligatoria.';
        esValido = false;
      }

      if (!formData.modelo) {
        errors.modelo = 'El modelo es obligatorio.';
        esValido = false;
      }

      if (!formData.estado_fisico) {
        errors.estado_fisico = 'El estado físico es obligatorio.';
        esValido = false;
      }

      if (!formData.presupuesto) {
        errors.presupuesto = 'El presupuesto es obligatorio.';
        esValido = false;
      }

      if (!formData.nombre_cliente) {
        errors.nombre_cliente = 'El nombre del cliente es obligatorio.';
        esValido = false;
      }

      if (!formData.monto_total || isNaN(formData.monto_total)) {
        errors.monto_total = 'El monto total del servicio es obligatorio y debe ser un número.';
        esValido = false;
      }

      if (!formData.anticipo || isNaN(formData.anticipo)) {
        errors.anticipo = 'El anticipo es obligatorio y debe ser un número.';
        esValido = false;
      }

      return esValido;
    };

    const generar_orden = () => {
      if (!validarFormulario()) {
        showNotification.value = true;
        setTimeout(() => {
          showNotification.value = false;
        }, 3000);
        return;
      }

      const nuevoEquipo = {
        "numero_de_serie": formData.numero_de_serie,
        "marca": formData.marca,
        "modelo": formData.modelo,
        "tipo_de_dispositivo": formData.tipo_de_dispositivo,
        "estado_fisico": formData.estado_fisico,
        "cargador": formData.cargador
      };

      const nuevaordendeservicio = {
        "fecha_de_ingreso": '',
        "presupuesto": formData.presupuesto,
        "monto_total": Number(formData.monto_total),
        "anticipo": Number(formData.anticipo),
        "nombre_Cliente": formData.nombre_cliente,
        "id_equipo": ''
      };

      axios.post(`${url}equipo`, nuevoEquipo)
        .then((response) => {
          if (response.data != null) {
            nuevaordendeservicio.id_equipo = response.data;
            nuevaordendeservicio.fecha_de_ingreso = getFechaActual();
            axios.post(`${url}orden_servicio/nuevaordendeservicio`, nuevaordendeservicio)
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.error(error);
              });
          }
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      console.log(nuevoEquipo);
    };

    return { formData, errors, showNotification, generar_orden };
  },
};
</script>

<template>
  <header id="headerFormOrden">
    Llene los datos para generar una nueva orden de servicio
  </header>
  <div id="divGeneral">
    <div id="divColumna1">
      <div class="cb_tipo_dispositivo">
        <form action="#">
          <label for="lang">Tipo de equipo</label>
          <select name="tipos_de_equipo" id="lang" v-model="formData.tipo_de_dispositivo">
            <option value="escritorio">Escritorio</option>
            <option value="laptop">Laptop</option>
            <option value="consola">Consola</option>
          </select>
        </form>
      </div>
      <input type="text" placeholder="Numero de serie" v-model="formData.numero_de_serie"/>
      <span class="error-message" v-if="errors.numero_de_serie">{{ errors.numero_de_serie }}</span>

      <input type="text" placeholder="Marca" v-model="formData.marca"/>
      <span class="error-message" v-if="errors.marca">{{ errors.marca }}</span>

      <input type="text" placeholder="Modelo" v-model="formData.modelo"/>
      <span class="error-message" v-if="errors.modelo">{{ errors.modelo }}</span>

      <label>¿Cuenta con cargador/eliminador este equipo?</label>
      <input type="checkbox" role="switch" id="customToggle" class="custom-toggle" v-model="formData.cargador"/>

      <label>Estado físico</label>
      <textarea
        name="estado_fisico"
        id="ta_estado_fisico"
        cols="30"
        rows="5"
        v-model="formData.estado_fisico"
      ></textarea>
      <span class="error-message" v-if="errors.estado_fisico">{{ errors.estado_fisico }}</span>

      <label>Presupuesto</label>
      <textarea
        name="presupuesto"
        id="ta_presupuesto"
        cols="30"
        rows="5"
        v-model="formData.presupuesto"
      ></textarea>
      <span class="error-message" v-if="errors.presupuesto">{{ errors.presupuesto }}</span>

      <input type="text" placeholder="Nombre del cliente" v-model="formData.nombre_cliente"/>
      <span class="error-message" v-if="errors.nombre_cliente">{{ errors.nombre_cliente }}</span>

      <input type="text" placeholder="Monto total del servicio" v-model="formData.monto_total"/>
      <span class="error-message" v-if="errors.monto_total">{{ errors.monto_total }}</span>

      <input type="text" placeholder="Anticipo" v-model="formData.anticipo"/>
      <span class="error-message" v-if="errors.anticipo">{{ errors.anticipo }}</span>

      <button class="btn_generar_orden" type="button" v-on:click="generar_orden">Generar orden</button>
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
@import "../assets/FormularioOrden.css";
</style>

