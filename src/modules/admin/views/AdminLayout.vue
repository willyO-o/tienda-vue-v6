<script setup>
import Aside from '@/modules/admin/components/layouts/Aside.vue'
import Nav from '@/modules/admin/components/layouts/Nav.vue'
import Footer from '@/modules/admin/components/layouts/Footer.vue'
import Settings from '@/modules/admin/components/layouts/Settings.vue';

</script>


<template>

    <Aside />

    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <!-- Navbar -->
        <Nav />
        <!-- End Navbar -->
        <div class="container-fluid py-2">

            <RouterView />

            <Footer />

        </div>
    </main>

    <Settings />


</template>