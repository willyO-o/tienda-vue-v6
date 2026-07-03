<script setup>

import { reactive, ref, onMounted } from 'vue'

import { getCategorias } from '@/services/categoriaService'

import productoValidationSchema from '@/schemas/productoValidationSchema'
import { Form, Field, ErrorMessage } from 'vee-validate'



import vueFilePond from 'vue-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';


import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview, FilePondPluginFileEncode);


import { useRoute, useRouter } from 'vue-router'

import { createProducto, getProductoId, updateProducto } from '@/services/productoService'

import { imagenesArray } from '@/utils/productoUtil'

import Swal from 'sweetalert2';


const route = useRoute()
const router = useRouter()


const filepondRef = ref(null)

const datosForm = reactive({
    titulo: "iPhone 13",
    descripcion: "Nuevo iPhone 13",
    imagen: "",
    precio: 999.99,
    stock: 100,
    categoria_id: 0
})

const imagenes = ref([])


const categorias = ref([])

const cargarCategorias = async () => {

    const resultado = await getCategorias({ limit: 2000 })

    categorias.value = resultado.data

}


const agregarImagen = (error, file) => {


    if (!error) {
        imagenes.value.push({ id: file.id, data: file.getFileEncodeDataURL() })
    }

}

const quitarImagen = (error, file) => {


    if (!error) {

        imagenes.value = imagenes.value.filter(img => img.id != file.id)

    }

}


const errorImg = ref(false)

const guardarProducto = async () => {

    if (imagenes.value.length == 0) {
        errorImg.value = true
        return
    }

    try {

        datosForm.imagen = JSON.stringify(imagenes.value.map(img => img.data))

        let resultado = null

        if (route.params.id) {
            resultado = await updateProducto(route.params.id, datosForm)
        } else {
            resultado = await createProducto(datosForm)
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
            title: resultado.message || "Producto guardado correctamente"
        });

        router.push({ name: 'Productos'})


    } catch (error) {

        Swal.fire("Error", error.message || "ocurrio un error ")

    }


}



const cargarProducto = async (idProducto) => {



    const resultado = await getProductoId(idProducto)


    datosForm.titulo = resultado.titulo
    datosForm.descripcion = resultado.descripcion
    datosForm.precio = resultado.precio
    datosForm.stock = resultado.stock
    datosForm.categoria_id = resultado.categoria_id

    const imgResult = imagenesArray(resultado.imagen)


    imgResult.forEach(img => {

        filepondRef.value.addFile(img,)
    })



}



onMounted(() => {

    cargarCategorias()

    if (route.params.id) {
        cargarProducto(route.params.id)
    }


    // console.log("referencia", filepondRef.value);




})



</script>


<template>

    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <Form action="#" :validation-schema="productoValidationSchema" @submit="guardarProducto">
                        <div class="row">
                            <div class="col-md-8 my-3">
                                <label class="form-label">Titulo del Producto</label>
                                <div class="input-group input-group-outline ">
                                    <Field type="text" v-model="datosForm.titulo" name="titulo" class="form-control" />
                                </div>
                                <ErrorMessage class="text-danger small" name="titulo" />
                            </div>
                            <div class="col-md-4 my-3">
                                <label class="form-label">Categoria </label>
                                <div class="input-group input-group-outline  border rounded px-2">
                                    <Field as="select" v-model="datosForm.categoria_id" name="categoria_id"
                                        class="form-select">
                                        <option :value="0">Seleccione</option>
                                        <option v-for="categoria in categorias" :key="categoria.id"
                                            :value="categoria.id">
                                            {{ categoria.categoria }}
                                        </option>
                                    </Field>
                                </div>
                                <ErrorMessage class="text-danger small" name="categoria_id" />
                            </div>
                            <div class="col-md-6 my-3">
                                <label class="form-label">Precio</label>
                                <div class="input-group input-group-outline ">
                                    <Field type="number" v-model="datosForm.precio" name="precio"
                                        class="form-control" />
                                </div>
                                <ErrorMessage class="text-danger small" name="precio" />
                            </div>
                            <div class="col-md-6 my-3">
                                <label class="form-label">Stock</label>
                                <div class="input-group input-group-outline ">
                                    <Field type="number" v-model="datosForm.stock" name="stock" class="form-control" />
                                </div>
                                <ErrorMessage class="text-danger small" name="stock" />
                            </div>
                            <div class="col-md-12 my-3">
                                <label class="form-label">Descripción</label>
                                <div class="input-group input-group-outline ">
                                    <Field as="textarea" rows="6" v-model="datosForm.descripcion" name="descripcion"
                                        class="form-control" />
                                </div>
                                <ErrorMessage class="text-danger small" name="descripcion" />
                            </div>

                            <div class="col-md-12 my-3">
                                <label class="form-label">Imagenes</label>

                                <file-pond ref="filepondRef" v-on:init="() => console.log('FilePond initialized')"
                                    @addfile="agregarImagen" @removefile="quitarImagen" :required="true"
                                    :allow-multiple="true" :allowFileTypeValidation="true"
                                    :acceptedFileTypes="['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/avif']"
                                    :allow-file-encode="true"
                                    label-idle="<i class='fas fa-upload'></i> <br>Arrastra y suelta tus imágenes o haz <u>clic aqui</u> para seleccionarlas" />

                                <div v-if="errorImg" class="text-danger small">
                                    Por favor agregue al menos una imagen para el producto.
                                </div>
                            </div>


                        </div>


                        <button class="btn btn-primary">
                            <i class="fas fa-save"></i>
                            Guardar Producto
                        </button>

                    </Form>





                </div>

            </div>

        </div>


    </div>



</template>