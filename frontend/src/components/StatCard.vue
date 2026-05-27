<script setup>
defineProps({
  title: String,
  playerName: String,
  statValue: [String, Number],
  theme: String,
})
</script>

<template>
  <div
    :class="[
      'bg-white p-4 rounded-lg shadow-sm border-l-4',
      theme === 'yellow' ? 'border-yellow-200 border-l-yellow-400' : '',
      theme === 'green' ? 'border-green-200 border-l-green-500' : '',
      theme === 'blue' ? 'border-blue-200 border-l-blue-500' : '',
      theme === 'purple' ? 'border-purple-200 border-l-purple-500' : '',
    ]"
  >
    <div class="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">{{ title }}</div>
    <div class="text-xl font-bold text-gray-800">{{ playerName }}</div>
    <div
      :class="[
        'text-sm font-semibold',
        theme === 'yellow' ? 'text-yellow-600' : '',
        theme === 'green' ? 'text-green-600' : '',
        theme === 'blue' ? 'text-blue-600' : '',
        theme === 'purple' ? 'text-purple-600' : '',
      ]"
    >
      {{ statValue }}
    </div>
  </div>
</template>
