<script setup>

import { useRoute } from 'vue-router'

const route = useRoute()


</script>


<template>
    <aside class=" z-index-3 sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2  bg-white my-2"
        id="sidenav-main">
        <div class="sidenav-header">
            <i class="fas fa-times p-3 cursor-pointer text-dark opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                aria-hidden="true" id="iconSidenav"></i>
            <RouterLink class="navbar-brand px-4 py-3 m-0"
                :to="{ name: 'Inicio'}" >
                <img src="/assets/img/logo-ct-dark.png" class="navbar-brand-img" width="26" height="26"
                    alt="main_logo">
                <span class="ms-1 text-sm text-dark">Mi tienda</span>
            </RouterLink>
        </div>
        <hr class="horizontal dark mt-0 mb-2">
        <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <RouterLink  :class="route.name == 'Dashboard' ?  'active bg-gradient-dark text-white': 'text-dark'" class="nav-link " :to="{name:'Dashboard'}">
                        <i class="material-symbols-rounded opacity-5">dashboard</i>
                        <span class="nav-link-text ms-1">Tablero</span>
                    </RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink :class="route.name == 'Categorias' ?  'active bg-gradient-dark text-white': 'text-dark'" class="nav-link " :to="{name:'Categorias'}">
                        <i class="material-symbols-rounded opacity-5">table_view</i>
                        <span class="nav-link-text ms-1">Categorias</span>
                    </RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink :class="route.name == 'Productos' ?  'active bg-gradient-dark text-white': 'text-dark'" class="nav-link " :to="{name:'Productos'}">
                        <i class="material-symbols-rounded opacity-5">table_view</i>
                        <span class="nav-link-text ms-1">Productos</span>
                    </RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink :class="route.name == 'Usuarios' ?  'active bg-gradient-dark text-white': 'text-dark'" class="nav-link " :to="{name:'Usuarios'}">
                        <i class="material-symbols-rounded opacity-5">person</i>
                        <span class="nav-link-text ms-1">Usuarios</span>
                    </RouterLink>
                </li>
            
            </ul>
        </div>
        <div class="sidenav-footer position-absolute w-100 bottom-0 ">
            <div class="mx-3">
                <a class="btn btn-outline-dark mt-4 w-100"
                    href="https://www.creative-tim.com/learning-lab/bootstrap/overview/material-dashboard?ref=sidebarfree"
                    type="button">Documentation</a>
                <a class="btn bg-gradient-dark w-100"
                    href="https://www.creative-tim.com/product/material-dashboard-pro?ref=sidebarfree"
                    type="button">Upgrade to pro</a>
            </div>
        </div>
    </aside>


</template>