<script setup>

import { ref, onMounted, reactive } from "vue";

import { getUsuarios, createUsuario, deleteUsuario, getUsuarioId, updateUsuario } from '@/services/usuarioService'

import { formatDate } from '@/utils/dateUtil'


import Paginador from "@/components/Paginador.vue";


import usuarioValidationSchema from "@/schemas/usuarioValidationSchema"

import { Form, Field, ErrorMessage } from "vee-validate";

import { Modal } from "bootstrap"

import { confimarAccion } from "@/utils/alertUtil"



import vueFilePond from 'vue-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';


import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview, FilePondPluginFileEncode);

import Swal from "sweetalert2";

const parametros = ref({
    page: 1,
    limit: 10,
    search: "",
})

const usuarios = ref([])
const totalUsuarios = ref(0)

const cargandoTabla = ref(false)



const listarUsuarios = async (pagina = 1) => {

    parametros.value.page = pagina

    const resultado = await getUsuarios(parametros.value)

    usuarios.value = resultado.data

    totalUsuarios.value = resultado.total

    console.log(usuarios.value);


}




const modalUsuarios = ref(null)

const abrirModal = (limpiar = true) => {

    if (!modalUsuarios.value) {
        modalUsuarios.value = new Modal(document.querySelector('#modalUsuarios'))
    }

    if (limpiar) {
        formulario.email = ""
        formulario.estado = "activo"
        formulario.password = ""
        formulario.confirmPassword = ""
        formulario.avatar = ""
        filepondRef.value.removeFiles()
        usuarioEditar.value = null
    }

    modalUsuarios.value.show()



}


const formulario = reactive({
    email: "",
    password: "",
    confirmPassword: "",
    estado: "activo",
    avatar: ""
})


const agregarImagen = (error, file) => {


    if (!error) {
        formulario.avatar = file.getFileEncodeDataURL()
    }

}

const quitarImagen = (error, file) => {


    if (!error) {

        formulario.avatar = ""

    }

}

const procesando = ref(false)


const procesarFormulario = async () => {


    try {
        procesando.value = true


        let resultado = null

        if (usuarioEditar.value) {

            if( formulario.password == ""){
                delete formulario.password
                delete formulario.confirmPassword
            }


            resultado = await updateUsuario(usuarioEditar.value, formulario)

        } else {
            resultado = await createUsuario(formulario)
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
            title: resultado.message || "Usuario creado correctamente"
        });

        modalUsuarios.value.hide()
        listarUsuarios()

    } catch (error) {

        Swal.fire("Error!", "Ocurrió un error al crear el usuario", "error");

    }



}

const eliminarUsuario = async id => {


    const confirmacion = await confimarAccion("Confirmación", "¿Estás seguro de eliminar este usuario?")

    if (!confirmacion) return


    const resultado = await deleteUsuario(id)

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
        title: resultado.message || "Usuario eliminado correctamente"
    });

    usuarios.value = usuarios.value.filter(us => us.id != id)


}

const filepondRef = ref(null)
const usuarioEditar = ref(null)

const editarUsuario = async id => {

    const resultado = await getUsuarioId(id)

    formulario.email = resultado.email
    formulario.estado = resultado.estado
    formulario.avatar = resultado.avatar

    usuarioEditar.value = resultado.id

    // filepondRef.value.addFile(resultado.avatar)

    abrirModal(false)

}

onMounted(() => {
    listarUsuarios()
})


</script>


<template>

    <div class="row">
        <div class="col-12">
            <div class="card my-4">
                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div class="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-between">
                        <h6 class="text-white text-capitalize ps-3">Listado de Usuarios</h6>
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
                                        Usuario</th>
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
                                <tr v-for="(usuario, indice) in usuarios" :key="usuario.id">
                                    <td>
                                        {{ indice + 1 }}
                                    </td>
                                    <td>
                                        <div class="d-flex px-2 py-1">
                                            <div>
                                                <img :src="usuario.avatar"
                                                    class="avatar avatar-sm me-3 border-radius-lg" alt="user1">
                                            </div>
                                            <div class="d-flex flex-column justify-content-center text-wrap">
                                                <h6 class="mb-0 text-sm">{{ usuario.email }}</h6>
                                            </div>
                                        </div>

                                    </td>
                                    <td>
                                        <p class="text-xs text-secondary text-center mb-0">
                                            {{ formatDate(usuario.creado_el) }}
                                        </p>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <span class="badge badge-sm "
                                            :class="{ 'bg-gradient-success': usuario.estado == 'activo', 'bg-gradient-danger': usuario.estado == 'inactivo' }">
                                            {{ usuario.estado }}
                                        </span>
                                    </td>

                                    <td class="align-middle">

                                        <a href="javascript:void(0);"
                                            class="text-secondary mx-2 font-weight-bold text-xs" data-toggle="tooltip"
                                            data-original-title="Editar Usuario" @click="editarUsuario(usuario.id)">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        <a href="javascript:void(0);" @click="eliminarUsuario(usuario.id)"
                                            class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                                            data-original-title="Eliminar Usuario">
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

                        <Paginador :total-items="totalUsuarios" :cantidad-por-pagina="parametros.limit"
                            :pagina-actual="parametros.page" @cambiar-pagina="listarUsuarios" />

                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalUsuarios" tabindex="-1" role="dialog" aria-labelledby="modalUsuariosLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered " role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title font-weight-normal" id="modalUsuariosLabel">Formulario de Registro</h5>
                    <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <Form :validation-schema="usuarioValidationSchema" @submit="procesarFormulario">
                    <div class="modal-body">

                        <div class="row">
                            <div class="col-md-12 my-2">
                                <label class="form-label">Correo electronico </label>
                                <div class="input-group input-group-outline ">
                                    <Field type="email" v-model="formulario.email" name="email" class="form-control" />
                                </div>
                                <ErrorMessage class="text-danger small" name="email" />
                            </div>
                            <div class="col-md-12 my-2">
                                <label class="form-label">Contraseña </label>
                                <div class="input-group input-group-outline ">
                                    <Field type="password" v-model="formulario.password" name="password"
                                        class="form-control" />
                                </div>
                                <ErrorMessage class="text-danger small" name="password" />
                            </div>
                            <div class="col-md-12 my-2">
                                <label class="form-label">Confirmar Contraseña </label>
                                <div class="input-group input-group-outline ">
                                    <Field type="password" v-model="formulario.confirmPassword" name="confirmPassword"
                                        class="form-control" />
                                </div>
                                <ErrorMessage class="text-danger small" name="confirmPassword" />
                            </div>
                            <div class="col-md-12 my-2">
                                <label class="form-label">Estado</label>

                                <div class="input-group input-group-outline border rounded">
                                    <Field as="select" v-model="formulario.estado" name="estado" class="form-select">
                                        <option value="activo">Activo</option>
                                        <option value="inactivo">Inactivo</option>

                                    </Field>
                                </div>
                                <ErrorMessage class="text-danger small" name="estado" />

                            </div>
                            <div>
                                <label for=""> Foto de perfil</label>

                                <file-pond ref="filepondRef" v-on:init="() => console.log('FilePond initialized')"
                                    @addfile="agregarImagen" @removefile="quitarImagen" :required="true"
                                    :allowFileTypeValidation="true"
                                    :acceptedFileTypes="['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/avif']"
                                    :allow-file-encode="true"
                                    label-idle="<i class='fas fa-upload'></i> <br>Arrastra y suelta tus imágenes o haz <u>clic aqui</u> para seleccionarlas" />

                                <ErrorMessage class="text-danger small" name="avatar" />
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