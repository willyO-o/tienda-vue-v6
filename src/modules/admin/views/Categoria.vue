<script setup>

import { getCategorias, createCategorias, deleteCategoria, getCategoriaId, updateCategoria } from '@/services/categoriaService'

import { ref, reactive, onMounted } from 'vue'

import { formatDate } from '@/utils/dateUtil'
import Paginador from '@/components/Paginador.vue'

import { Modal } from 'bootstrap'

import categoriaValidationSchema from '@/schemas/categoriaValidationSchema'
import { Form, Field, ErrorMessage } from 'vee-validate'

import { confimarAccion } from '@/utils/alertUtil'

import Swal from 'sweetalert2'


const categorias = ref([])

const parametros = ref({
    limit: 10,
    page: 1,
    search: ''
})

const procesando = ref(false)

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

const modalCategorias = ref(null)


const abrirModal = (limpiar = true) => {

    if (!modalCategorias.value) {
        modalCategorias.value = new Modal(document.querySelector('#ModalCategorias'))
    }

    if (limpiar) {
        formulario.categoria = ""
        formulario.estado = "activo"
        categoriaEditar.value = null
    }

    modalCategorias.value.show()



}


const formulario = reactive({
    categoria: "",
    estado: "activo"
})


const procesarFormulario = async () => {

    procesando.value = true
    let resultado = null
    try {

        if (categoriaEditar.value) {
            resultado = await updateCategoria(categoriaEditar.value, formulario)
        } else {
            resultado = await createCategorias(formulario)
        }



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
            title: resultado.message
        });

        formulario.categoria = ""
        formulario.estado = "activo"

        modalCategorias.value.hide()
        listarCategorias()

    } catch (error) {
        Swal.fire("Error", "Ocurrió un error al crear la categoria", "error")
    } finally {
        procesando.value = false
    }


}


const eliminar = async (id) => {

    const confirmacion = await confimarAccion("Confirmar Eliminación", "¿Estás seguro de eliminar esta categoria?")

    if (!confirmacion) return

    const resultado = await deleteCategoria(id)

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
        title: "Categoria eliminada correctamente"
    });

    categorias.value = categorias.value.filter(cat => cat.id != id)

}


const categoriaEditar = ref(null)


const editarCategoria = async id => {

    try {

        const resultado = await getCategoriaId(id)

        categoriaEditar.value = resultado.id
        formulario.categoria = resultado.categoria
        formulario.estado = resultado.estado

        abrirModal(false)

    } catch (error) {
        Swal.fire("Error", "Ocurrió un error al obtener la categoria", "error")
    }

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
                    <div class="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-between">
                        <h6 class="text-white text-capitalize ps-3">Listado de Categorias</h6>
                        <button class="btn btn-primary  me-4" @click="abrirModal">
                            <i class="fas fa-plus"></i>
                            Añadir Nuevo

                        </button>
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

                                        <a href="javascript:void(0);"
                                            class="text-secondary mx-2 font-weight-bold text-xs" data-toggle="tooltip"
                                            data-original-title="Editar Categoria"
                                            @click="editarCategoria(categoria.id)">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        <a href="javascript:void(0);" @click="eliminar(categoria.id)"
                                            class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                                            data-original-title="Eliminar Categoria">
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



    <!-- Modal -->
    <div class="modal fade" id="ModalCategorias" tabindex="-1" role="dialog" aria-labelledby="ModalCategoriasLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title font-weight-normal" id="ModalCategoriasLabel">Formulario de Registro</h5>
                    <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <Form :validation-schema="categoriaValidationSchema" @submit="procesarFormulario">
                    <div class="modal-body">

                        <div class="row">
                            <div class="col-md-6 my-3">
                                <label class="form-label">Nombre de la categoria</label>
                                <div class="input-group input-group-outline ">
                                    <Field type="text" v-model="formulario.categoria" name="categoria"
                                        class="form-control" />
                                </div>
                                <ErrorMessage class="text-danger small" name="categoria" />
                            </div>
                            <div class="col-md-6 my-3">
                                <label class="form-label">Estado</label>

                                <div class="input-group input-group-outline border ">
                                    <Field as="select" v-model="formulario.estado" name="estado" class="form-select">
                                        <option value="activo">Activo</option>
                                        <option value="inactivo">Inactivo</option>

                                    </Field>
                                </div>
                                <ErrorMessage class="text-danger small" name="estado" />

                            </div>
                        </div>


                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">
                            Cancelar
                        </button>
                        <button :class="{ 'disabled': procesando }" type="submit" class="btn bg-gradient-primary">
                            <i :class="{ 'fas fa-save': !procesando, 'fas fa-spinner fa-spin': procesando }"></i>
                            Guardar
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    </div>

</template>