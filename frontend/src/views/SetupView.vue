<script setup>
import { ref } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { useRouter } from 'vue-router'

const store = useGameStore()
const router = useRouter()

const selectedPlayers = ref([])
const errorMsg = ref('')

const handleStartGame = () => {
  if (selectedPlayers.value.length < 2) {
    errorMsg.value = 'Please select at least 2 players to start a game.'
    return
  }
  errorMsg.value = ''
  store.startGame(selectedPlayers.value)
  router.push('/active')
}
</script>

<template>
  <main class="flex-grow max-w-2xl mx-auto w-full p-4 my-6">
    <section class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 class="text-xl font-bold text-green-700 border-b-2 border-green-700 pb-2 mb-4">
        Select Players
      </h2>
      <p class="text-gray-600 mb-6">Who is playing this session? Check all that apply.</p>

      <form @submit.prevent="handleStartGame" class="space-y-6">
        <article class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <label
            v-for="player in store.availablePlayers"
            :key="player"
            class="flex items-center space-x-3 cursor-pointer p-2 hover:bg-green-50 rounded border border-transparent hover:border-green-100 transition-colors"
          >
            <input
              type="checkbox"
              :value="player"
              v-model="selectedPlayers"
              class="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-green-500"
            />
            <span class="text-gray-700 font-medium">{{ player }}</span>
          </label>
        </article>

        <div v-if="errorMsg" class="text-red-600 font-semibold bg-red-50 p-3 rounded-md">
          {{ errorMsg }}
        </div>

        <div class="pt-4 border-t border-gray-100">
          <button
            type="submit"
            class="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md shadow transition-colors"
          >
            Create Game
          </button>
        </div>
      </form>
    </section>
  </main>
</template>
