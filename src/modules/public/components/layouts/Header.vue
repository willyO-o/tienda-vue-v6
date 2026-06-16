<script setup>
import { onMounted } from 'vue'


onMounted(()=>{
    import('@/assets/js/headerScript.js')
})


</script>


<template>

    <header class="bg-gradient-dark">
        <div class="page-header min-vh-75" style="background-image: url('../assets/img/bg9.jpg');">
            <span class="mask bg-gradient-dark opacity-6"></span>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8 text-center mx-auto my-auto">
                        <h1 class="text-white">Bienvenidos a Mi Tienda</h1>
                        <p class="lead mb-4 text-white opacity-8">
                            Encuentra los mejores productos al mejor precio. Explora nuestra amplia selección y disfruta de una experiencia de compra única.
                        </p>
                        <RouterLink :to="{ name: 'Tienda'}" class="btn bg-white text-dark">Ver Tienda</RouterLink>
                        <h6 class="text-white mb-2 mt-5">
                            Síguenos en nuestras redes sociales
                        </h6>
                        <div class="d-flex justify-content-center">
                            <a href="javascript:;"><i class="fab fa-facebook text-lg text-white me-4"></i></a>
                            <a href="javascript:;"><i class="fab fa-instagram text-lg text-white me-4"></i></a>
                            <a href="javascript:;"><i class="fab fa-twitter text-lg text-white me-4"></i></a>
                            <a href="javascript:;"><i class="fab fa-google-plus text-lg text-white"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>