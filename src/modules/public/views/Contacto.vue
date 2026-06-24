<script setup>

import { reactive } from 'vue';
import { sendContactForm } from '@/services/contactoService'
import contactoValidationSchema from '@/schemas/contactoValidationSchema'

import { Form, Field, ErrorMessage } from 'vee-validate'



const datosFormulario = reactive({
    nombre_completo: "Juan Pérez",
    correo: "juan@example.com",
    mensaje: "Me interesa conocer más sobre sus productos"
})


const enviarMensaje = async () => {


    try {

        const resultado = await sendContactForm(datosFormulario);

        console.log(resultado);

    } catch (error) {
        
    }

}



</script>


<template>
    <section>
        <div class="page-header min-vh-100">
            <div class="container">
                <div class="row">
                    <div
                        class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                        <div class="position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                            style="background-image: url('https://images.unsplash.com/photo-1579541764764-6401d4100dd7?q=80&w=1400&auto=format&fit=crop'); background-size: cover;"
                            loading="lazy"></div>
                    </div>
                    <div class="col-xl-5 col-lg-6 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                        <div class="card d-flex blur justify-content-center shadow-lg my-sm-0 my-sm-6 mt-8 mb-5">
                            <div class="card-header p-0 position-relative mt-2 mx-2 z-index-2 bg-transparent">
                                <div class="bg-dark shadow-dark border-radius-md p-3">
                                    <h5 class="text-white text-primary mb-0">Contactanos</h5>
                                    <p class="text-white text-sm mb-0">Para más preguntas, contáctanos usando nuestro
                                        formulario de contacto.</p>
                                </div>
                            </div>
                            <div class="card-body">
                                <p class="pb-3">
                                    Para cualquier consulta, no dudes en contactarnos. Nuestro equipo está aquí para
                                    ayudarte y responder a todas tus preguntas. Por favor, completa el formulario a
                                    continuación y nos pondremos en contacto contigo lo antes posible.
                                </p>

                                <Form :validation-schema="contactoValidationSchema" id="contact-form" method="post"
                                    autocomplete="off"
                                    @submit="enviarMensaje"
                                    v-slot="{ errors }">
                                    <div class="card-body p-0 my-3">
                                        <div class="row">
                                            <div class="col-md-6 mb-4">
                                                <div class="input-group input-group-static ">
                                                    <label>Nombre Completo</label>
                                                    <Field type="text" v-model="datosFormulario.nombre_completo"
                                                        name="nombre_completo" class="form-control"
                                                        placeholder="Tu nombre completo" />
                                                </div>
                                                <ErrorMessage name="nombre_completo" class="small text-danger" />


                                            </div>
                                            <div class="col-md-6 ps-md-2 mb-4">
                                                <div class="input-group input-group-static ">
                                                    <label>Correo Electrónico</label>
                                                    <Field type="email" class="form-control" name="correo"
                                                        v-model="datosFormulario.correo"
                                                        placeholder="usuario@dominio.com" />
                                                </div>
                                                <ErrorMessage name="correo" class="small text-danger" />

                                            </div>
                                        </div>
                                        <div class="form-group mb-0 mt-md-0 my-4">
                                            <div class="input-group input-group-static ">
                                                <label>¿Como podemos ayudarte?</label>
                                                <Field as="textarea" name="mensaje" class="form-control" id="message"
                                                    rows="6" v-model="datosFormulario.mensaje"
                                                    placeholder="Estribe tu mensaje..">
                                                </Field>
                                            </div>
                                            <ErrorMessage name="mensaje" class="small text-danger" />

                                        </div>
                                        <div class="row">
                                            <div class="col-md-12 text-center">
                                                <button type="submit" class="btn bg-gradient-dark mt-3 mb-0">
                                                    Enviar Mensaje
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>