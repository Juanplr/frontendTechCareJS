<script>
import { reactive } from 'vue';
import axios from "axios";
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

    const generar_orden = () => {
      const parametros = 
      {
        numero_de_serie: formData.numero_de_serie,
        marca: formData.marca,
        modelo: formData.modelo,
        estado_fisico: formData.estado_fisico,
        presupuesto: formData.presupuesto,
        nombre_cliente: formData.nombre_cliente,
        monto_total: formData.monto_total,
        anticipo: formData.anticipo,
        tipo_de_dispositivo: formData.tipo_de_dispositivo,
        cargador: formData.cargador
      }

      const nuevoEquipo ={
          "numero_de_serie": parametros.numero_de_serie,
          "marca": parametros.marca,
          "modelo": parametros.modelo,
          "tipo_de_dispositivo": parametros.tipo_de_dispositivo,
          "estado_fisico": parametros.estado_fisico,
          "cargador": parametros.cargador
      }

      const nuevaordendeservicio ={

      }

      axios.post(`${url}equipo`, nuevoEquipo
      )
      .then((response)=>{
        if(responnse != null){
          parametros.numero_de_serie=responnse.data;
          axios.post(`${url}orden_servicio/nuevaordendeservicio`, nuevoEquipo
      )
      .then((response)=>{
        
      })
      .catch((error)=>{
        console.error(error);
      });
        }
      })
      .catch((error)=>{
        console.error(error);
      });


      console.log(parametros);
    };

    return { formData, generar_orden };
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
      <input type="text" placeholder="Marca" v-model="formData.marca"/>
      <input type="text" placeholder="Modelo" v-model="formData.modelo"/>
      <input type="checkbox" role="switch" id="customToggle" class="custom-toggle" v-model="formData.cargador"/>

      <label>Estado físico</label>
      <textarea
        name="estado_fisico"
        id="ta_estado_fisico"
        cols="30"
        rows="5"
        v-model="formData.estado_fisico"
      ></textarea>
      <label>Presupuesto</label>
      <textarea
        name="presupuesto"
        id="ta_presupuesto"
        cols="30"
        rows="5"
        v-model="formData.presupuesto"
      ></textarea>
    </div>
    <div id="divColumna2">
      <input type="text" placeholder="Nombre del cliente" v-model="formData.nombre_cliente"/>
      <input type="text" placeholder="Monto total del servicio" v-model="formData.monto_total"/>
      <input type="text" placeholder="Anticipo" v-model="formData.anticipo"/>
      <button type="button" v-on:click="generar_orden">Generar orden</button>
    </div>
  </div>
</template>

<style>
@import "../assets/FormularioOrden.css";
</style>
