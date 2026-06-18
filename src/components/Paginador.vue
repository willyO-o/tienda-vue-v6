<script setup>

import { computed } from 'vue'
 


const props = defineProps({
    totalItems: {
        type: Number,
        required: true
    },
    cantidadPorPagina: {
        type: Number,
        required: true
    },
    paginaActual: {
        type: Number,
        required: true
    }
})

const cantidadBotones = computed( () => {
    return Math.ceil(props.totalItems / props.cantidadPorPagina )
})


const emit =defineEmits(['cambiar-pagina'])


</script>

<template>

    <div class="pagination-container justify-content-center d-flex mt-4">
        <ul class="pagination pagination-secondary">
            <li class="page-item">
                <a class="page-link" href="javascript:void(0);" aria-label="Previous"
                @click="emit('cambiar-pagina', props.paginaActual- 1)"
                :class="{'disabled': props.paginaActual <=1}">
                    <span aria-hidden="true"><i class="fa fa-angle-left" aria-hidden="true"></i></span>
                </a>
            </li>



            <li 
                v-for="nroPagina in cantidadBotones"
                class="page-item " :class="{'active':nroPagina == props.paginaActual}">
                <a class="page-link " 
                @click="emit('cambiar-pagina', nroPagina)"
                :class="{ 'text-white disabled':nroPagina == props.paginaActual}" href="javascript:void(0);">{{ nroPagina }}</a>
            </li>


            <li class="page-item">
                <a class="page-link" href="javascript:void(0);" aria-label="Next"
                @click="emit('cambiar-pagina', props.paginaActual+ 1)"
                :class="{'disabled': props.paginaActual >= cantidadBotones}">
                    <span aria-hidden="true"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
                </a>
            </li>
        </ul>
    </div>

</template>