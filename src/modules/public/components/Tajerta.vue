<script setup>

import { primeraImagen, truncarTexto } from '@/utils/productoUtil'

import useCarritoStore from '@/modules/public/stores/carritoStore'

const props = defineProps({
    producto: {
        type: Object,
        required: true,
    }
})

const carritoStore = useCarritoStore()

</script>


<template>


    <div  class="col-lg-4  mt-lg-0 mt-4">
        <div class="card">
            <div class="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                <a class="d-block blur-shadow-image">
                    <img :src="primeraImagen(producto.imagen)" alt="img-colored-shadow" width="100%"
                        class="img-fluid border-radius-lg">
                </a>
            </div>
            <div class="card-body text-center">
                <h5 class="font-weight-normal">
                    <a href="javascript:;">
                        {{ producto.titulo }}
                    </a>
                </h5>
                <h4>Bs. {{ producto.precio }}</h4>
                <p class="mb-0">
                    {{ truncarTexto(producto.descripcion) }}
                </p>
                <button 
                @click="carritoStore.agregarItem(producto)"
                    type="button" class="btn bg-gradient-info btn-sm mb-0 mt-3">
                    <i class="fas fa-shopping-cart"></i>
                    Añadir al carrito
                </button>
            </div>
        </div>
    </div>


</template>