<template>
    <div class="container_c">
        <div class="container_nav">
            <h6 id="h_No">No. de Orden #</h6>
            <h6 id="h_titulo">Cierre de Orden de Servicio</h6>
        </div>
        <div class="form_principal">
            <form class="form_orden">
                <div class="container_left">
                    <ul class="ul_left">
                        <li class="li_left">
                            <input type="text" class="input_text_line" placeholder="Nombre del Cliente"/>
                        </li>
                        <li class="li_left">
                            <input type="text" class="input_text_line" placeholder="Servicio Brindado"/>
                        </li>
                        <li class="li_left">
                            <input type="text" class="input_text_line" placeholder="Anticipo"/>
                        </li>
                        <li class="li_left">
                            <input type="text" class="input_text_line" placeholder="Restante" />
                        </li>
                        <li class="li_left">
                            <h6 class="h_left">Acciones realizadas en el servicio</h6>
                            <textarea  class="input_text"></textarea>
                        </li>
                        <li class="li_left">
                            <h6 class="h_left">Recomendaciones</h6>
                            <textarea  class="input_text"></textarea>
                        </li>
                    </ul>
                </div>
                <div class="container_right">
                    <ul class="ul_right">
                        <li class="conclusiones">
                            <h6>Conclusiones del Servicio</h6>
                            <textarea  class="input_text"></textarea>
                        </li>
                        <li class="button">
                            <button id="btn_orden">Generar Orden</button>
                        </li>
                    </ul>
                </div>
            </form>
        </div>
    </div>
</template>

  
<style>
@import "../assets/CierreDeOrden.css";
</style>