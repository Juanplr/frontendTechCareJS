<template>
<header id="headerFormOrden">Llene los datos para generar una nueva orden de servicio</header>
  <div id="divGeneral">
    <div id="divColumna1">
      <input id="selectTipo" list="browsers" />
      <datalist id="browsers">
        <option value="Google"></option>
        <option value="IE9"></option>
      </datalist>
      <input type="text" placeholder="Numero de serie"/>
      <input type="text" placeholder="Marca"/>
      <input type="text" placeholder="Modelo" />
      
      <input type="date" />
      <label>Presupuesto</label>
      <textarea name="presupuesto" id="textArea" cols="30" rows="10"></textarea>
    </div>
    <div id="divColumna2">
      <input type="text" placeholder="Nombre del cliente"/>
      <input type="text" placeholder="Monto total del servicio"/>
      <input type="text" placeholder="Anticipo"/>
      <button>Generar orden</button>
    </div>
  </div>
</template>
<style>
#divGeneral {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Dos columnas de ancho igual */
   /* Espacio entre las columnas */
  justify-items: center;
  margin-top: 60px;
  height: 8cm;
}
#headerFormOrden{
  padding: 2%;
  text-align: center;
  background-color: rgb(5, 19, 40);
  color: #fff;
  font-weight: bold;
  font-size:x-large;
}
#divColumna1{
  width: 30%;
  display: grid;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  row-gap: 30px;
}
#divColumna2{
  width: 20%;
  display: grid;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  row-gap: 30px;
}
#selectTipo{
  padding: 5%;
  width: 110px;
}
input[type="date"] {
  display: block; /* Asegura que se comporte como un bloque para alinearse correctamente */
  width: 80%; /* Asegura que ocupe todo el ancho disponible */
  padding: 9%;
  
}

input[type="text"]{
  border-top: none;
  border-left: none;
  border-right: none;
}
input[type="text"]:focus{
  border-top: none;
  border-left: none;
  border-right: none;
}

</style>
