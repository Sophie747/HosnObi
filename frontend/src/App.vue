<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-100 text-gray-800 font-sans">
    <NavBar />

    <RouterView />

    <AppFooter />
  </div>
</template>
