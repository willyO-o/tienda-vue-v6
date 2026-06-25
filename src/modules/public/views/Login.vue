<script setup>

import { reactive, ref } from 'vue';

import { login, getUser } from '@/services/authService'

import loginValidationSchema from '@/schemas/loginValidationSchema'

import { Form, Field, ErrorMessage } from 'vee-validate';

import useUsuarioStore from '@/stores/usuarioStore';

import Swal from 'sweetalert2';

import { useRouter } from 'vue-router';




const usuarioStore = useUsuarioStore()
const router = useRouter()

const procesando = ref(false)

const credenciales = reactive({
    email: "administrador@gmail.com",
    password: "123456"
})


const autenticar = async () => {

    procesando.value = true
    try {
        const resultado = await login(credenciales)



        const accessToken = resultado.access_token.token

        const refreshToken = resultado.refresh_token.token

        usuarioStore.setSesion(accessToken, refreshToken)

        const user = await getUser()

        const { avatar, email } = user

        usuarioStore.setUser({ avatar, email })

        setTimeout(() => {
            procesando.value = false
            router.push({ name: 'Dashboard' })
        }, 1500);

        Swal.fire("Bienvenido:  " + email, "Has iniciado sesión correctamente", "success")

    } catch (error) {
        Swal.fire("Error", "Usuario o contraseña incorrectos", "error")
        procesando.value = false

    }


}


</script>


<template>
    <div class="page-header align-items-start min-vh-100"
        style="background-image: url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80');"
        loading="lazy">
        <span class="mask bg-gradient-dark opacity-6"></span>
        <div class="container my-auto">
            <div class="row">
                <div class="col-lg-4 col-md-8 col-12 mx-auto">
                    <div class="card z-index-0 fadeIn3 fadeInBottom">
                        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div class="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                                <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
                                <div class="row mt-3">
                                    <div class="col-2 text-center ms-auto">
                                        <a class="btn btn-link px-3" href="javascript:;">
                                            <i class="fa fa-facebook text-white text-lg"></i>
                                        </a>
                                    </div>
                                    <div class="col-2 text-center px-1">
                                        <a class="btn btn-link px-3" href="javascript:;">
                                            <i class="fa fa-github text-white text-lg"></i>
                                        </a>
                                    </div>
                                    <div class="col-2 text-center me-auto">
                                        <a class="btn btn-link px-3" href="javascript:;">
                                            <i class="fa fa-google text-white text-lg"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <Form :validation-schema="loginValidationSchema" @submit="autenticar" role="form"
                                class="text-start">

                                <div class="my-3">
                                    <label class="form-label">Correo</label>
                                    <div class="input-group input-group-outline ">
                                        <Field type="email" v-model="credenciales.email" name="email"
                                            class="form-control" />
                                    </div>
                                    <ErrorMessage name="email" class="text-danger small" />
                                </div>


                                <div class="mb-3">
                                    <label class="form-label">Contraseña</label>

                                    <div class="input-group input-group-outline ">
                                        <Field type="password" v-model="credenciales.password" name="password"
                                            class="form-control" />
                                    </div>
                                    <ErrorMessage name="password" class="text-danger small" />

                                </div>


                                <div class="text-center">
                                    <button type="submit" :class="{ 'disabled': procesando }"
                                        class="btn bg-gradient-dark w-100 my-4 mb-2">
                                        <i class="fas fa-spinner fa-spin" v-if="procesando"></i>
                                        {{ procesando ? 'Procesando...' : 'Iniciar Sesión' }}
                                    </button>
                                </div>
                                <p class="mt-4 text-sm text-center">
                                    Olvidaste tu contraseña?
                                </p>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>


</template>