<script setup>
import useCarritoStore from '@/modules/public/stores/carritoStore';
import { primeraImagen } from '@/utils/productoUtil';

const carritoStore = useCarritoStore();






</script>

<template>

    <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
        <!-- Section with four info areas left & one card right with image and waves -->
        <section class="py-7">
            <div class="container">
                <h2 class="text-center mb-5"> Carrito de Compras</h2>
                <div class="row">

                    <div class="col-md-8">
                        <div class="card">
                            <div class="table-responsive">
                                <table class="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                Producto</th>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                Precio</th>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                Cantidad</th>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                Sub Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in carritoStore.carrito" :key="item.id">
                                            <td>
                                                <div class="d-flex px-2">
                                                    <div>
                                                        <img :src="primeraImagen(item.imagen)"
                                                            class="avatar avatar-lg rounded me-2">
                                                    </div>
                                                    <div class="my-auto">
                                                        <h6 class="mb-0 text-xs text-wrap">{{ item.titulo }}</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p class="text-xs font-weight-normal mb-0">{{ item.precio }}</p>
                                            </td>
                                            <td>
                                                <div
                                                    class="d-flex justify-content-lg-start justify-content-center p-2 ">
                                                    <button @click="carritoStore.agregarItem(item, -1)"
                                                        class="btn btn-dark p-3 mb-0">
                                                        <i class="fas fa-minus   mb-0"></i>
                                                    </button>
                                                    <input v-model="item.cantidad" type="number"
                                                        class="form-control border px-5 py-1 form-input-number">
                                                    <button @click="carritoStore.agregarItem(item, 1)"
                                                        class="btn btn-dark p-3 mb-0">
                                                        <i class="fas fa-plus mt-1   mb-0"></i>
                                                    </button>
                                                </div>
                                            </td>
                                            <td class="align-middle text-center">
                                                <div class="d-flex align-items-center">
                                                    {{ Number(item.cantidad) * Number(item.precio) }}
                                                </div>
                                            </td>

                                            <td class="align-middle">
                                                <button @click="carritoStore.eliminarItem(item.id)"
                                                    class="btn btn-link text-danger mb-0">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>

                                        <tr v-if="carritoStore.carrito.length == 0">
                                            <td colspan="100%" class="p-5">
                                                <p class="text-center">No tienes productos en el carrito</p>

                                            </td>
                                        </tr>



                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </div>

                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h4>Resumen de Compra</h4>
                                <p class="h3">Total: Bs {{  carritoStore.total  }}</p>
                                
                            </div>

                        </div>
                    </div>

                </div>
            </div>



        </section>

    </div>

</template>


<style scoped>
.form-input-number::-webkit-inner-spin-button,
.form-input-number::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.form-input-number {
    -moz-appearance: textfield;

}
</style>