<script setup>


import axios from 'axios';
import { ref } from 'vue';



const mensaje = ref('');

const mensajes = ref([{
    role: "assistant",
    content: "Hola, soy tu asistente virtual. ¿En qué puedo ayudarte hoy?"
}])


const enviarMensaje = async () => {

    mensajes.value.push({
        role: "user",
        content: mensaje.value
    })

    try {

        const respuesta = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
            "messages": mensajes.value,
            "model": "qwen/qwen3-32b",
            "temperature": 1,
            "max_completion_tokens": 1600,
            "top_p": 1,
            "stream": false,
            "reasoning_effort": "none",
            "stop": null
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '
            }
        })


        const msjRespuesta = respuesta.data.choices[0].message.content


        mensajes.value.push({
            role: 'assistant',
            content: msjRespuesta
        })


        mensaje.value = '';


    } catch (error) {

        console.log("error:", error);
        

    }



}







</script>
<template>
    <section class="position-fixed bottom-0 end-0 z-index-3" style="max-width: 350px;">
        <div class="container py-5">

            <div class="row d-flex justify-content-center ">
                <div class="col-12">

                    <div class="card shadow">
                        <div class="card-header d-flex justify-content-between align-items-center p-3"
                            style="border-top: 4px solid #ffa900;">
                            <h5 class="mb-0">Chat messages</h5>
                            <div class="d-flex flex-row align-items-center">
                                <span class="badge bg-warning me-3">20</span>
                                <i class="fas fa-minus me-3 text-muted fa-xs"></i>
                                <i class="fas fa-comments me-3 text-muted fa-xs"></i>
                                <i class="fas fa-times text-muted fa-xs"></i>
                            </div>
                        </div>
                        <div class="card-body overflow-auto" data-mdb-perfect-scrollbar-init
                            style="position: relative; height: 400px">

                            <div v-for="(msj, index) in mensajes" :key="index">
                                <div v-if="msj.role === 'assistant'" class="d-flex justify-content-between">
                                    <p class="small mb-1">Chatbot</p>
                                    <p class="small mb-1 text-muted">23 Jan 2:00 pm</p>
                                </div>
                                <div v-if="msj.role === 'assistant'" class="d-flex flex-row justify-content-start">
                                    <img src="/assets/img/chat/chatbot.png" alt="avatar 1"
                                        style="width: 45px; height: 100%;">
                                    <div>
                                        <p class="small p-2 ms-3 mb-3 rounded-3 bg-body-tertiary">
                                            {{ msj.content }}
                                        </p>
                                    </div>
                                </div>

                                <div v-if="msj.role === 'user'" class="d-flex justify-content-between">
                                    <p class="small mb-1 text-muted">23 Jan 2:05 pm</p>
                                    <p class="small mb-1">Usuario</p>
                                </div>
                                <div v-if="msj.role === 'user'" class="d-flex flex-row justify-content-end mb-4 pt-1">
                                    <div>
                                        <p class="small p-2 me-3 mb-3 text-white rounded-3 bg-warning">
                                            {{ msj.content }}
                                        </p>
                                    </div>
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                        alt="avatar 1" style="width: 45px; height: 100%;">
                                </div>

                            </div>





                        </div>
                        <div class="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                            <div class="input-group mb-0">
                                <input type="text" class="form-control border" placeholder="Type message"
                                    aria-label="Recipient's username" aria-describedby="button-addon2"
                                    v-model="mensaje" />
                                <button @click="enviarMensaje" data-mdb-button-init data-mdb-ripple-init
                                    class="btn btn-warning mb-0" type="button" id="button-addon2"
                                    style="padding-top: .55rem;">
                                    Button
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </section>



</template>