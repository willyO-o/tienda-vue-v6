<script setup>

import { ref, onMounted } from 'vue'

import { getProductos } from '@/services/productoService'

import { primeraImagen } from '@/utils/productoUtil'
import Paginador from '@/components/Paginador.vue'



const parametros = ref({
    page: 1,
    limit: 10,
    search: '',
    categoria_id: 0
})

const productos = ref([])

const totalProductos = ref(0)

const cargandoTabla = ref(false)


const cargarProductos = async (pagina = 1) => {

    cargandoTabla.value = true
    productos.value = []
    parametros.value.page = pagina

    const resultado = await getProductos(parametros.value)

    productos.value = resultado.data
    totalProductos.value = resultado.total

    cargandoTabla.value = false

    console.log(resultado);




}


onMounted(() => {

    cargarProductos()



})




</script>


<template>


    <div class="row">
        <div class="col-12">
            <div class="card my-4">
                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div class="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                        <h6 class="text-white text-capitalize ps-3">Authors table</h6>
                    </div>
                </div>
                <div class="card-body px-0 pb-2">
                    <div class="table-responsive p-0">
                        <table class="table align-items-center mb-0">
                            <thead>
                                <tr>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        #
                                    </th>
                                    <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                        Producto
                                    </th>
                                    <th
                                        class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Precio (Bs.)</th>
                                    <th
                                        class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Stock</th>
                                    <th
                                        class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Categoria</th>
                                    <th class="text-secondary opacity-7"></th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr v-for="(producto, indice) in productos" :key="producto.id">
                                    <td class=" text-center">
                                        {{ indice + 1 }}
                                    </td>
                                    <td>
                                        <div class="d-flex px-2 py-1">
                                            <div>
                                                <img :src="primeraImagen(producto.imagen)"
                                                    class="avatar avatar-sm me-3 border-radius-lg" alt="user1">
                                            </div>
                                            <div class="d-flex flex-column justify-content-center text-wrap">
                                                <h6 class="mb-0 text-sm">{{ producto.titulo }}</h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p class="text-xs font-weight-bold mb-0">
                                            {{ producto.precio }}
                                        </p>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <span class="badge badge-sm "
                                            :class="producto.stock <= 5 ? 'bg-gradient-danger' : 'bg-gradient-success'">
                                            {{ producto.stock }}
                                        </span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span class="text-secondary text-xs font-weight-bold">
                                            {{ producto.categoria }}
                                        </span>
                                    </td>

                                    <td class="align-middle">
                                        <a href="javascript:void(0);" class="text-secondary font-weight-bold text-xs"
                                            data-toggle="tooltip" data-original-title="Edit user">
                                            <i class="fas fa-eye"></i>
                                        </a>
                                        <a href="javascript:void(0);"
                                            class="text-secondary mx-2 font-weight-bold text-xs" data-toggle="tooltip"
                                            data-original-title="Edit user">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        <a href="javascript:void(0);" class="text-secondary font-weight-bold text-xs"
                                            data-toggle="tooltip" data-original-title="Edit user">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                    </td>
                                </tr>

                                <tr v-if="cargandoTabla">
                                    <td colspan="100%">
                                        <div class="text-center p-5">
                                            Cargando...<br>
                                            <div class="spinner-grow" role="status">
                                                <span class="sr-only"></span>
                                            </div>


                                        </div>


                                    </td>

                                </tr>
                            </tbody>

                        </table>

                        <div>
                            <Paginador :total-items="totalProductos" :cantidad-por-pagina="parametros.limit"
                                :pagina-actual="parametros.page" @cambiar-pagina="cargarProductos" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

</template>