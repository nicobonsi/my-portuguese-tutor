<template>
  <div class="flex flex-col gap-4">

    <div class="flex items-center justify-between">
      <h3 class="font-bold text-gray-800">Grammar Drill</h3>
      <button @click="emit('done')" class="text-gray-400 text-sm">✕ Exit</button>
    </div>

    <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div class="h-full bg-purple-500 rounded-full transition-all duration-500" :style="{ width: progressPct + '%' }" />
    </div>
    <p class="text-xs text-gray-400 text-center -mt-2">{{ current + 1 }} of {{ exercises.length }}</p>

    <!-- Done screen -->
    <div v-if="done" class="text-center py-8 flex flex-col items-center gap-4">
      <div class="text-5xl">✏️</div>
      <h3 class="text-xl font-bold text-gray-800">Drill complete!</h3>
      <p class="text-sm text-gray-500">{{ correct }} / {{ exercises.length }} correct</p>
      <div class="bg-green-50 border border-green-200 rounded-2xl px-6 py-3">
        <p class="text-xl font-bold text-portuguese-green">+{{ xpEarned }} XP</p>
      </div>
      <button @click="emit('done')" class="bg-portuguese-green text-white px-8 py-3 rounded-xl font-semibold text-sm">
        Back to Practice
      </button>
    </div>

    <!-- Exercise -->
    <div v-else class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-5">

      <div class="text-center">
        <p class="text-xs text-gray-400 uppercase tracking-wide mb-2">Choose the correct answer</p>
        <p class="text-base font-semibold text-gray-800 leading-snug">{{ exercise.prompt }}</p>
      </div>

      <!-- Options -->
      <div class="flex flex-col gap-2">
        <button
          v-for="opt in exercise.options"
          :key="opt"
          @click="select(opt)"
          :disabled="answered"
          :class="optClass(opt)"
          class="w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all"
        >{{ opt }}</button>
      </div>

      <!-- Explanation -->
      <div v-if="answered && exercise.explanation" class="bg-purple-50 border border-purple-100 rounded-xl px-4 py-3">
        <p class="text-xs text-purple-700">💡 {{ exercise.explanation }}</p>
      </div>

      <button v-if="answered" @click="next" class="bg-portuguese-green text-white py-3 rounded-xl font-semibold text-sm active:scale-95 transition-transform">
        Continue →
      </button>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useGamification } from '../../composables/useGamification'
import { useLesson } from '../../composables/useLesson'
import { allLessons } from '../../data/curriculum'
import type { Exercise } from '../../data/curriculum'

const emit = defineEmits<{ (e: 'done'): void }>()

const gamification = useGamification()
const { progressMap } = useLesson()

const exercises = ref<Exercise[]>([])
const current = ref(0)
const answered = ref(false)
const selected = ref<string | null>(null)
const correct = ref(0)
const done = ref(false)
const xpEarned = ref(0)

const exercise = computed(() => exercises.value[current.value])
const progressPct = computed(() => Math.round((current.value / Math.max(exercises.value.length, 1)) * 100))

function buildExercises() {
  const completedIds = Object.entries(progressMap.value)
    .filter(([, p]) => p.status === 'complete')
    .map(([id]) => id)

  const pool: Exercise[] = []
  for (const lesson of allLessons) {
    const isUnlocked = completedIds.includes(lesson.id) || lesson.id === allLessons[0].id
    if (isUnlocked) {
      const grammar = lesson.exercises.filter(e =>
        e.type === 'multiple_choice' && !e.promptAudio
      )
      pool.push(...grammar)
    }
  }

  const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, 10)

  if (shuffled.length === 0) {
    const all = allLessons.flatMap(l => l.exercises.filter(e => e.type === 'multiple_choice'))
    exercises.value = all.sort(() => Math.random() - 0.5).slice(0, 10)
  } else {
    exercises.value = shuffled
  }
}

function select(opt: string) {
  if (answered.value) return
  selected.value = opt
  answered.value = true
  if (opt === exercise.value.answer) correct.value++
}

function optClass(opt: string) {
  if (!answered.value) return 'border-gray-200 bg-white hover:border-purple-400'
  if (opt === exercise.value.answer) return 'border-green-400 bg-green-50 text-green-800'
  if (opt === selected.value) return 'border-red-300 bg-red-50 text-red-700'
  return 'border-gray-100 bg-gray-50 text-gray-400'
}

async function next() {
  if (current.value < exercises.value.length - 1) {
    current.value++
    answered.value = false
    selected.value = null
  } else {
    const earned = correct.value * 20
    xpEarned.value = earned
    await gamification.load()
    await gamification.awardXp(earned, 'grammar_drill')
    done.value = true
  }
}

onMounted(() => {
  buildExercises()
  gamification.load()
})
</script>
