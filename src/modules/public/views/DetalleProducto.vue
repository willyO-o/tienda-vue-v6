<script setup>

import Carrucel from '@/components/Carrucel.vue';

import { getProductoId } from '@/services/productoService'

import { ref, onMounted } from "vue";

import { useRoute } from 'vue-router';

import { imagenesArray } from '@/utils/productoUtil'

import useCarritoStore from '@/modules/public/stores/carritoStore'


const carritoStore =useCarritoStore()
const route = useRoute()
const producto = ref({})

const imagenes = ref([])


const cantidad =ref(1)

const listarProducto = async () => {

    const resultado = await getProductoId(route.params.id)

    producto.value = resultado
    imagenes.value = imagenesArray(resultado.imagen)

    console.log(producto.value);



}

const incrementar = () => {
    if(cantidad.value < producto.value.stock){
        cantidad.value++
    }
}

const decrementar = () => {
    if ( cantidad.value  <= 1) return 
    cantidad.value--
}

const verificarCantidad = () => {

    if(cantidad.value > producto.value.stock){
        cantidad.value = producto.value.stock
    }

    if(cantidad.value < 1){
        cantidad.value = 1
    }

}


onMounted(() => {

    listarProducto()


})


</script>


<template>

    <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
        <!-- Section with four info areas left & one card right with image and waves -->
        <section class="py-7">
            <div class="container">
                <h2 class="text-center mb-5"> </h2>

                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <Carrucel :imagenes="imagenes" />
                            </div>
                        </div>

                    </div>

                    <div class="col-md-6 mb-4">
                        <div class="card shadow-lg">
                            <span class="badge rounded-pill bg-light text-dark w-30 mt-n2 mx-auto">Oferta</span>
                            <div class="card-header  pt-4 pb-3">
                                <h1 class="font-weight-bold h3">
                                    {{ producto.titulo }}
                                </h1>
                                <h4 class="font-weight-bold mt-2 text-primary">
                                    <small class="text-lg mb-auto">
                                        Bs
                                    </small>
                                    {{ producto.precio }}
                                </h4>
                            </div>
                            <div class="card-body text-lg-start text-center pt-0">
                                <div class="d-flex justify-content-lg-start justify-content-center p-2">
                                    <i class="fas fa-minus mt-1"></i>
                                    Categoria:
                                    <span class="ps-2">{{ producto.categoria }}</span>
                                </div>

                                <div class="d-flex justify-content-lg-start justify-content-center p-2">
                                    <i class="fas fa-minus mt-1"></i>
                                    Disponible:
                                    <span class="ps-2 text-success">{{ producto.stock }} unidades </span>
                                </div>






                                <div class="d-flex justify-content-lg-start justify-content-center p-2 w-50">
                                    <button @click="decrementar"  class="btn btn-dark p-3 mb-0">
                                        <i class="fas fa-minus   mb-0"></i>
                                    </button>
                                    <input @change="verificarCantidad"  v-model="cantidad" type="number" class="form-control border px-5 py-1 form-input-number" >
                                    <button @click="incrementar" class="btn btn-dark p-3 mb-0">
                                        <i class="fas fa-plus mt-1   mb-0"></i>
                                    </button>
                                </div>

                                <div class="d-flex justify-content-between gap-2">
                                    <a  @click="carritoStore.agregarItem(producto,cantidad)" href="javascript:void(0);"
                                    :class="{ 'disabled': carritoStore.stockDisponibleProducto(producto.id) ==false}"   
                                    class="btn btn-icon w-100 bg-gradient-info d-lg-block mt-3 mb-0">
                                        <i class="fas fa-shopping-cart ms-1"></i>
                                        Añadir al carrito
                                    </a>
                                    <a href="javascript:void(0);"
                                        class="btn btn-icon w-100 bg-gradient-dark d-lg-block mt-3 mb-0">
                                        <i class="fas fa-credit-card ms-1"></i>
                                        Comprar ahora
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div class="col-12 mt-3">
                        <div class="card">
                            <div class="card-body">
                                <h3>Descripcion</h3>
                                <p>
                                    {{  producto.descripcion }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    </div>



</template>


<style scoped>

.form-input-number::-webkit-inner-spin-button,
.form-input-number::-webkit-outer-spin-button
{
  -webkit-appearance: none;
  margin: 0;
}
.form-input-number{
  -moz-appearance: textfield;
    
}


</style>