<script setup>
import Placeholder from '@/modules/public/components/Placeholder.vue'
import Tarjeta from '@/modules/public/components/Tajerta.vue'
import Paginador from '@/components/Paginador.vue'

import { onMounted, ref } from 'vue'

import { getProductos } from '@/services/productoService'
import { getCategorias } from '@/services/categoriaService'

const productos = ref([])
const categorias = ref([])
const parametros = ref({
    page: 1,
    limit: 9,
    search: '',
    categoria_id: null
})

const totalItems = ref(0)

const cargando = ref(false)

const cargarProductos = async () => {

    cargando.value = true

    productos.value = []
    const resultado = await getProductos(parametros.value)

    productos.value = resultado.data
    totalItems.value = resultado.total

    cargando.value = false

}


const cambiarPagina = nroPagina => {

    parametros.value.page = nroPagina
    cargarProductos()
}

const cargarCategorias = async () => {
    const resultado = await getCategorias()

    console.log(resultado);

    categorias.value = resultado.data
}


onMounted(() => {

    cargarCategorias()
    cargarProductos()
})


</script>


<template>


    <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
        <!-- Section with four info areas left & one card right with image and waves -->
        <section class="py-7">
            <div class="container">
                <h2 class="text-center mb-5"> Productos destacados</h2>

                <div class="row mb-4 justify-content-between">
                    <div class="col-auto">
                        <div class="">
                            <input type="search" v-model="parametros.search" @keydown.enter="cargarProductos">
                        </div>
                    </div>

                    <div class="col-auto">
                        <select @change="cargarProductos" v-model="parametros.categoria_id"
                            class="input-group input-group-static mb-4">
                            <option :value="null">Todos</option>
                            <option v-for="cat in categorias" :key="cat.id" :value="cat.id"> {{ cat.categoria }}
                            </option>

                        </select>
                    </div>
                </div>

                <div class="row align-items-center">


                    <Tarjeta v-for="item in productos" :key="item.id" :producto="item" />

                    <Placeholder v-if="cargando" />
      

             


                    <div v-if="productos.length == 0 && !cargando" class="p-5 text-center">
                        <p class="h6">No se encontraron resultados</p>
                    </div>

                </div>


                <Paginador :total-items="totalItems" :cantidad-por-pagina="parametros.limit"
                    :pagina-actual="parametros.page" @cambiar-pagina="cambiarPagina" />

            </div>
        </section>

    </div>

</template>