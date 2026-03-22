<template>
  <div class="flex flex-col gap-5">

    <!-- Prompt -->
    <div class="text-center">
      <p class="text-base font-semibold text-gray-800">{{ exercise.prompt }}</p>
      <!-- Audio button if there's audio to play -->
      <button
        v-if="exercise.promptAudio"
        @click="playPrompt"
        :disabled="speaking"
        class="mt-3 inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm disabled:opacity-60 active:scale-95 transition-all"
      >
        <span>{{ speaking ? '⏳' : '🔊' }}</span>
        {{ speaking ? 'Playing…' : 'Hear it' }}
      </button>
    </div>

    <!-- Options -->
    <div class="flex flex-col gap-2">
      <button
        v-for="opt in exercise.options"
        :key="opt"
        @click="select(opt)"
        :disabled="answered"
        :class="optionClass(opt)"
        class="w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all active:scale-95 disabled:active:scale-100"
      >
        {{ opt }}
      </button>
    </div>

    <!-- Explanation -->
    <div v-if="answered && exercise.explanation" class="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
      <p class="text-xs text-blue-700">💡 {{ exercise.explanation }}</p>
    </div>

    <!-- Next button -->
    <button
      v-if="answered"
      @click="emit('done', isCorrect)"
      class="bg-portuguese-green text-white py-3 rounded-xl font-semibold text-sm active:scale-95 transition-transform"
    >
      Continue →
    </button>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Exercise } from '../../data/curriculum'
import { useAudio } from '../../composables/useAudio'

const props = defineProps<{ exercise: Exercise }>()
const emit = defineEmits<{ (e: 'done', correct: boolean): void }>()

const { speak, speaking } = useAudio()
const selected = ref<string | null>(null)
const answered = ref(false)
const isCorrect = ref(false)

function playPrompt() {
  if (props.exercise.promptAudio) speak(props.exercise.promptAudio)
}

function select(opt: string) {
  if (answered.value) return
  selected.value = opt
  answered.value = true
  isCorrect.value = opt === props.exercise.answer
  // Play audio feedback
  speak(props.exercise.answer)
}

function optionClass(opt: string) {
  if (!answered.value) return 'border-gray-200 bg-white hover:border-portuguese-green hover:bg-green-50'
  if (opt === props.exercise.answer) return 'border-green-400 bg-green-50 text-green-800'
  if (opt === selected.value) return 'border-red-300 bg-red-50 text-red-700'
  return 'border-gray-100 bg-gray-50 text-gray-400'
}
</script>
