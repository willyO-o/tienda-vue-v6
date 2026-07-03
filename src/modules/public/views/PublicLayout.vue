<script setup>

import Nav from '@/modules/public/components/layouts/Nav.vue'
import Header from '@/modules/public/components/layouts/Header.vue'
import Footer from '@/modules/public/components/layouts/Footer.vue'

import Chatbot from '@/modules/public/components/Chatbot.vue'

import { useRoute } from 'vue-router';

const route = useRoute()



</script>


<template>

    <Nav />

    <Header  v-if="!route.meta.hiddenBanner" />


    <RouterView />


    <Footer />


    <Chatbot />
</template>