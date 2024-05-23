<script>
import { reactive } from 'vue';
import axios from "axios";
import { getFechaActual } from "@/Funtionsjs/DateFormat";
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
      const nuevoEquipo ={
          "numero_de_serie": formData.numero_de_serie,
          "marca": formData.marca,
          "modelo": formData.modelo,
          "tipo_de_dispositivo": formData.tipo_de_dispositivo,
          "estado_fisico": formData.estado_fisico,
          "cargador": formData.cargador
      }

      const nuevaordendeservicio ={
          "fecha_de_ingreso": '',
          "presupuesto": formData.presupuesto,
          "monto_total": Number(formData.monto_total),
          "anticipo": Number(formData.anticipo),
          "nombre_Cliente": formData.nombre_cliente,
          "id_equipo": ''
      }

      axios.post(`${url}equipo`, nuevoEquipo
      )
      .then((response)=>{
        if(response.data != null){
          nuevaordendeservicio.id_equipo=response.data;
          nuevaordendeservicio.fecha_de_ingreso= getFechaActual();
          axios.post(`${url}orden_servicio/nuevaordendeservicio`, nuevaordendeservicio
      )
      .then((response)=>{
        console.log(response.data);
      })
      .catch((error)=>{
        console.error(error);
      });
        }

        console.log(response.data);
        
      })
      .catch((error)=>{
        console.error(error);
      });


      console.log(nuevoEquipo);
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
      <label>Presupuesto</label>
      <textarea
        name="presupuesto"
        id="ta_presupuesto"
        cols="30"
        rows="5"
        v-model="formData.presupuesto"
      ></textarea>
      <input type="text" placeholder="Nombre del cliente" v-model="formData.nombre_cliente"/>
      <input type="text" placeholder="Monto total del servicio" v-model="formData.monto_total"/>
      <input type="text" placeholder="Anticipo" v-model="formData.anticipo"/>
      <button class="btn_generar_orden" type="button" v-on:click="generar_orden">Generar orden</button>
    </div>
  </div>
</template>

<style>
@import "../assets/FormularioOrden.css";
</style>
