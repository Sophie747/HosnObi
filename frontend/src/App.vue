<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useGameStore } from '@/stores/gameStore'

const store = useGameStore()
onMounted(() => {
  store.fetchInitialData()
})
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-100 text-gray-800 font-sans">
    <NavBar />

    <RouterView />

    <AppFooter />
  </div>
</template>
