<script setup>

import { getCategorias } from '@/services/categoriaService'

import { ref, onMounted } from 'vue'

import { formatDate } from '@/utils/dateUtil'
import Paginador from '@/components/Paginador.vue'


const categorias = ref([])

const parametros = ref({
    limit: 10,
    page: 1,
    search: ''
})

const cargandoTabla = ref(false)

const totalCategorias = ref(0)

const listarCategorias = async (pagina = 1) => {

    cargandoTabla.value = true
    categorias.value = []
    parametros.value.page = pagina

    const resultado = await getCategorias(parametros.value)

    categorias.value = resultado.data

    totalCategorias.value = resultado.total

    cargandoTabla.value = false
    console.log(categorias.value);

}




onMounted(() => {

    listarCategorias()


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
                                        #</th>
                                    <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                        Categoria</th>
                                    <th
                                        class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        F. creación </th>
                                    <th
                                        class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Estado</th>
                                    <th class="text-secondary opacity-7"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(categoria, indice) in categorias" :key="categoria.id">
                                    <td>
                                        {{ indice + 1 }}
                                    </td>
                                    <td>
                                        <h6 class="mb-0 text-sm">{{ categoria.categoria }}</h6>
                                    </td>
                                    <td>
                                        <p class="text-xs text-secondary text-center mb-0">
                                            {{ formatDate(categoria.creado_el) }}
                                        </p>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <span class="badge badge-sm "
                                            :class="{ 'bg-gradient-success': categoria.estado == 'activo', 'bg-gradient-danger': categoria.estado == 'inactivo' }">
                                            {{ categoria.estado }}
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

                        <Paginador :total-items="totalCategorias" :cantidad-por-pagina="parametros.limit"
                            :pagina-actual="parametros.page" @cambiar-pagina="listarCategorias" />

                    </div>
                </div>
            </div>
        </div>
    </div>

</template>