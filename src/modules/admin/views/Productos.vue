<script setup>

import { ref, onMounted } from 'vue'

import { getProductos, getProductoId, deleteProducto } from '@/services/productoService'
import { formatDate } from '@/utils/dateUtil'
import { confimarAccion } from '@/utils/alertUtil'
import Swal  from 'sweetalert2'

import { primeraImagen, imagenesArray } from '@/utils/productoUtil'
import Paginador from '@/components/Paginador.vue'

import { Modal } from 'bootstrap'
import Carrucel from '@/components/Carrucel.vue'



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


const datosProducto = ref({
    categoria: "",
    categoria_id: "",
    creado_el: "",
    descripcion: "",
    id: 0,
    imagen: "",
    precio: "",
    stock: "",
    titulo: "",
})

const modalProducto = ref(null)

const verDetalles = async id => {

    const resultado = await getProductoId(id)

    datosProducto.value = resultado

    if (!modalProducto.value) {

        modalProducto.value = new Modal(document.querySelector("#modalProducto"))

    }

    modalProducto.value.show()

}



const eliminarProducto =  async id => {

    const confirmacion =  await confimarAccion('Confimar eliminación', '¿Está seguro de eliminar este producto?')

    if(!confirmacion) return


    const resultado = await deleteProducto(id)

    productos.value = productos.value.filter(prod => prod.id != id)

    Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    }).fire({
        icon: "success",
        title: resultado.message || "Producto eliminado correctamente"
    });

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
                    <div class="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-between">
                        <h6 class="text-white text-capitalize ps-3">Listado de productos</h6>
                        <RouterLink :to="{ name: 'CrearProducto' }" class="btn btn-primary  me-3">
                            Agregar Nuevo
                        </RouterLink>
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
                                        <a href="javascript:void(0);" @click="verDetalles(producto.id)"
                                            class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                                            data-original-title="Ver detalles">
                                            <i class="fas fa-eye"></i>
                                        </a>
                                        <RouterLink :to="{name: 'EditarProducto',params: {id:producto.id}}"
                                            class="text-secondary mx-2 font-weight-bold text-xs" data-toggle="tooltip"
                                            data-original-title="Editar producto">
                                            <i class="fas fa-edit"></i>
                                        </RouterLink>
                                        <a 
                                        @click="eliminarProducto(producto.id)"
                                        href="javascript:void(0);" class="text-secondary font-weight-bold text-xs"
                                            data-toggle="tooltip" data-original-title="Eliminar producto">
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




    <!-- Modal -->
    <div class="modal fade" id="modalProducto" tabindex="-1" role="dialog" aria-labelledby="modalProductoLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title font-weight-normal" id="modalProductoLabel">Detalles del Producto</h5>
                    <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body p-0">
                    <div class="card ">


                        <div class="card-header text-center pt-4 pb-3">
                            <h4 class="font-weight-bold mt-2">
                                {{ datosProducto.titulo }}
                            </h4>
                        </div>
                        <div class="card-body text-lg-start text-center pt-0">

                            <div class="row">
                                <Carrucel class="col-md-8" :imagenes="imagenesArray(datosProducto.imagen)" />
                            </div>


                            <div class="">
                                <span>Descripción:</span>
                                <p class="">{{  datosProducto.descripcion }}</p>
                            </div>

                            <div class="d-flex justify-content-lg-start justify-content-center p-2">
                                <b>Categoria: </b>
                                <span class="ps-3">{{  datosProducto.categoria }} </span>
                            </div>

                            <div class="d-flex justify-content-lg-start justify-content-center p-2">
                                <b>Precio: </b>
                                <span class="ps-3">{{  datosProducto.precio }} </span>
                            </div>

                            <div class="d-flex justify-content-lg-start justify-content-center p-2">
                                <b>Stock: </b>
                                <span class="ps-3">{{  datosProducto.stock }} unidades </span>
                            </div>

                            <div class="d-flex justify-content-lg-start justify-content-center p-2">
                                <b>Creado el:</b>
                                <span class="ps-3">{{  formatDate(datosProducto.creado_el) }} </span>
                            </div>

               

                            <RouterLink :to="{name: 'DetalleProducto', params: { id: datosProducto.id }}" target="_blank" class="btn btn-icon bg-gradient-dark d-lg-block mt-3 mb-0">
                                Ver en tienda
                                <i class="fas fa-arrow-right ms-1"></i>
                            </RouterLink>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

</template>