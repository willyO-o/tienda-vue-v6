<script setup>

import useCarritoStore from '@/modules/public/stores/carritoStore'

import { primeraImagen } from '@/utils/productoUtil'



const carritoStore = useCarritoStore()


</script>


<template>
    <div class="container position-sticky z-index-sticky top-0">
        <div class="row">
            <div class="col-12">
                <nav
                    class=" border-shadow rounded bg-white navbar navbar-expand-lg position-absolute top-0 z-index-3 w-100 shadow my-3 navbar-transparent"
                    >
                    <div class="container">
                        <RouterLink class="navbar-brand  text-dark " :to="{ name: 'Inicio' }" rel="tooltip"
                            title="Designed and Coded by Creative Tim" data-placement="bottom">
                            Mi Tienda
                        </RouterLink>
                        <button class="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon mt-2">
                                <span class="navbar-toggler-bar bar1"></span>
                                <span class="navbar-toggler-bar bar2"></span>
                                <span class="navbar-toggler-bar bar3"></span>
                            </span>
                        </button>
                        <div class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0 ms-lg-12 ps-lg-5" id="navigation">
                            <ul class="navbar-nav navbar-nav-hover ms-auto text-dark">

                                <li class="nav-item ms-lg-auto">
                                    <RouterLink class="nav-link nav-link-icon me-2" :to="{ name: 'Inicio' }">
                                        <p class="d-inline  text-dark  text-sm z-index-1 font-weight-bold" data-bs-toggle="tooltip"
                                            data-bs-placement="bottom" title="">Inicio</p>
                                    </RouterLink>
                                </li>



                                <li class="nav-item ms-lg-auto">
                                    <RouterLink class="nav-link nav-link-icon me-2" :to="{ name: 'Tienda' }">
                                        <p class="d-inline  text-dark text-sm z-index-1 font-weight-bold" data-bs-toggle="tooltip"
                                            data-bs-placement="bottom" title="">Tienda</p>
                                    </RouterLink>
                                </li>
                                <li class="nav-item ms-lg-auto">
                                    <RouterLink class="nav-link nav-link-icon me-2" :to="{ name: 'Contacto' }">
                                        <p class="d-inline  text-dark text-sm z-index-1 font-weight-bold" data-bs-toggle="tooltip"
                                            data-bs-placement="bottom" title="">Contacto</p>
                                    </RouterLink>
                                </li>

                                <li class="nav-item dropdown dropdown-hover mx-2">
                                    <a class="nav-link  ps-2 d-flex justify-content-between cursor-pointer align-items-center"
                                        id="dropdownMenuPages8" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fas  text-dark fa-shopping-cart"></i>
                                        <img src="/assets/img/down-arrow-white.svg" alt="down-arrow"
                                            class="arrow ms-2 d-lg-block d-none">
                                        <img src="/assets/img/down-arrow-dark.svg" alt="down-arrow"
                                            class="arrow ms-2 d-lg-none d-block">
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-animation ms-n3 dropdown-md p-3 border-radius-lg mt-0 mt-lg-3"
                                        aria-labelledby="dropdownMenuPages8">
                                        <div class="d-none d-lg-block">
                                            <h6
                                                class="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-1">
                                                Carrito de Compras
                                            </h6>


                                            <a v-for="item in carritoStore.carrito" :key="item.id"
                                                href="javascript:void(0)"
                                                class="dropdown-item border-radius-md ps-1 position-relative">
                                                <div class="d-flex px-2 py-1">
                                                    <div>
                                                        <img :src="primeraImagen(item.imagen)"
                                                            class="avatar avatar-sm rounded me-3">
                                                    </div>
                                                    <div class="d-flex flex-column justify-content-center">
                                                        <h6 class="mb-0 text-xs text-wrap">{{ item.titulo }}</h6>
                                                        <p class="text-xs text-secondary mb-0">
                                                            {{ item.cantidad }} x {{ item.precio }} Bs.
                                                        </p>
                                                    </div>
                                                </div>
                                                <span @click="carritoStore.eliminarItem(item.id)"
                                                    class="position-absolute end-0 top-0 me-2 mt-2">
                                                    <i class="fas fa-trash text-danger"></i>
                                                </span>

                                            </a>

                                            <div v-if="carritoStore.carrito.length > 0">
                                                <hr class="border">
                                                <p class="h6">
                                                    Total: Bs. {{ carritoStore.total }}
                                                </p>
                                                <hr class="border">
                                                <div class="  d-flex justify-content-between gap-2">
                                                    <RouterLink :to="{ name: 'Carrito' }" href="javascript:void(0);"
                                                        class="btn btn-icon  btn-sm w-100 bg-gradient-info d-lg-block mt-0 mb-0">
                                                        <i class="fas fa-shopping-cart ms-1"></i>
                                                        Carrito
                                                    </RouterLink>
                                                    <a href="javascript:void(0);"
                                                        class="btn btn-icon btn-sm w-100 bg-gradient-dark d-lg-block mt-0 mb-0">
                                                        <i class="fas fa-credit-card ms-1"></i>
                                                        Pagar
                                                    </a>
                                                </div>
                                            </div>

                                            <div v-else>
                                                <h5 class="text-center">No tienes productos en el carrito</h5>
                                            </div>



                                        </div>
                                        <div class="d-lg-none">
                                            <h6
                                                class="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-1">
                                                Carrito de Compras
                                            </h6>
                                            <a v-for="item in carritoStore.carrito" :key="item.id"
                                                href="javascript:void(0)"
                                                class="dropdown-item border-radius-md ps-1 position-relative">
                                                <div class="d-flex px-2 py-1">
                                                    <div>
                                                        <img :src="primeraImagen(item.imagen)"
                                                            class="avatar avatar-sm rounded me-3">
                                                    </div>
                                                    <div class="d-flex flex-column justify-content-center">
                                                        <h6 class="mb-0 text-xs text-wrap">{{ item.titulo }}</h6>
                                                        <p class="text-xs text-secondary mb-0">
                                                            {{ item.cantidad }} x {{ item.precio }} Bs.
                                                        </p>
                                                    </div>
                                                </div>
                                                <span @click="carritoStore.eliminarItem(item.id)"
                                                    class="position-absolute end-0 top-0 me-2 mt-2">
                                                    <i class="fas fa-trash text-danger"></i>
                                                </span>

                                            </a>
                                            <div v-if="carritoStore.carrito.length > 0">
                                                <hr class="border">
                                                <p class="h6">
                                                    Total: Bs. {{ carritoStore.total }}
                                                </p>
                                            </div>

                                            <div v-else>
                                                <h5 class="text-center">No tienes productos en el carrito</h5>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li class="nav-item my-auto ms-3 ms-lg-0">
                                    <RouterLink :to="{name: 'Login'}"
                                        class="btn btn-sm  bg-dark  text-white mb-0 me-1 mt-2 mt-md-0">
                                        <i class="fas fa-user"></i>
                                        Login
                                    </RouterLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            </div>
        </div>
    </div>


</template>