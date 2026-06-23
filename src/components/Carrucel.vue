<script setup>

const props = defineProps({
    imagenes: {
        type: Array,
        required: true
    }
})


</script>

<template>

    <div class=" mx-auto">
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <ol class="carousel-indicators">
                <li v-for="(imagen, indice) in imagenes" :key="indice" data-target="#carouselExampleIndicators"
                    :data-bs-slide-to="indice" :class="{ 'active': indice == 0 }"></li>
            </ol>
            <div class="carousel-inner">
                <div v-for="(imagen, indice) in imagenes" :key="indice" class="carousel-item"
                    :class="{ 'active': indice == 0 }">
                    <img class="d-block w-100" :src="imagen" alt="First slide">
                </div>

            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Anterior</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Siguiente</span>
            </a>
        </div>
    </div>

</template>