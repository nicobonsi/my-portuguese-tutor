<template>
  <div class="flex flex-col items-center gap-6 py-4">

    <!-- Phrase display -->
    <div class="text-center">
      <p class="text-2xl font-bold text-gray-800">{{ exercise.promptAudio }}</p>
      <p class="text-gray-500 text-sm mt-1">{{ exercise.prompt }}</p>
    </div>

    <!-- Listen buttons -->
    <div class="flex gap-3">
      <button
        @click="playNormal"
        :disabled="speaking"
        class="flex items-center gap-2 bg-portuguese-green text-white px-5 py-3 rounded-xl font-medium text-sm disabled:opacity-60 active:scale-95 transition-all"
      >
        <span class="text-lg">{{ speaking ? '⏳' : '🔊' }}</span>
        {{ speaking ? 'Playing…' : 'Listen' }}
      </button>
      <button
        @click="playSlow"
        :disabled="speaking"
        class="flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-3 rounded-xl font-medium text-sm disabled:opacity-60 active:scale-95 transition-all"
      >
        <span class="text-lg">🐢</span>
        Slow
      </button>
    </div>

    <!-- Phonetic hint (if available) -->
    <div v-if="phonetic" class="bg-blue-50 border border-blue-100 rounded-xl px-4 py-2 text-center">
      <p class="text-xs text-blue-400 uppercase tracking-wide mb-0.5">Pronunciation guide</p>
      <p class="text-sm text-blue-700 font-mono">{{ phonetic }}</p>
    </div>

    <!-- Confirm button — user taps after repeating -->
    <button
      v-if="played"
      @click="confirm"
      class="bg-portuguese-green text-white px-8 py-3 rounded-xl font-semibold text-sm active:scale-95 transition-transform"
    >
      I said it ✓
    </button>

    <p v-else class="text-xs text-gray-400 text-center">Listen first, then repeat out loud</p>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Exercise } from '../../data/curriculum'
import { useAudio } from '../../composables/useAudio'

const props = defineProps<{ exercise: Exercise; phonetic?: string }>()
const emit = defineEmits<{ (e: 'correct'): void }>()

const { speak, speakSlow, speaking } = useAudio()
const played = ref(false)

async function playNormal() {
  await speak(props.exercise.promptAudio ?? props.exercise.answer)
  played.value = true
}

async function playSlow() {
  await speakSlow(props.exercise.promptAudio ?? props.exercise.answer)
  played.value = true
}

function confirm() {
  emit('correct')
}
</script>
