<template>
  <div class="flex flex-col min-h-screen bg-white">

    <!-- Header -->
    <div class="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
      <button @click="confirmExit" class="text-gray-400 hover:text-gray-600 text-xl">✕</button>
      <!-- Progress bar -->
      <div class="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          class="h-full bg-portuguese-green rounded-full transition-all duration-500"
          :style="{ width: progressPct + '%' }"
        />
      </div>
      <span class="text-sm text-gray-500 font-medium">{{ currentIndex + 1 }}/{{ totalExercises }}</span>
    </div>

    <!-- Phase: Dialogue preview -->
    <div v-if="phase === 'dialogue'" class="flex-1 flex flex-col p-4 gap-4 overflow-y-auto">
      <div class="text-center mb-2">
        <span class="text-xs bg-green-100 text-portuguese-green font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
          {{ lesson.cefrLevel }} · {{ lesson.titlePt }}
        </span>
        <h2 class="text-xl font-bold text-gray-800 mt-2">{{ lesson.title }}</h2>
        <p class="text-sm text-gray-500 mt-1">{{ lesson.description }}</p>
      </div>

      <!-- Dialogue -->
      <div v-if="lesson.dialogue?.length" class="flex flex-col gap-3">
        <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wide">Dialogue</h3>
        <div
          v-for="(line, i) in lesson.dialogue"
          :key="i"
          :class="line.speaker === 'A' ? 'self-start' : 'self-end'"
          class="max-w-[85%]"
        >
          <div
            :class="line.speaker === 'A' ? 'bg-gray-100 text-gray-800 rounded-2xl rounded-tl-sm' : 'bg-portuguese-green text-white rounded-2xl rounded-tr-sm'"
            class="px-4 py-2.5"
          >
            <p class="font-medium text-sm">{{ line.portuguese }}</p>
            <p :class="line.speaker === 'A' ? 'text-gray-500' : 'text-green-200'" class="text-xs mt-0.5">{{ line.english }}</p>
          </div>
          <button
            @click="speakLine(line.portuguese)"
            :class="line.speaker === 'B' ? 'ml-auto' : ''"
            class="flex items-center gap-1 mt-1 text-xs text-gray-400 hover:text-portuguese-green"
          >
            🔊 <span>Hear it</span>
          </button>
        </div>
      </div>

      <!-- Cultural note -->
      <div v-if="lesson.culturalNote" class="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p class="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">🇵🇹 Cultural Note</p>
        <p class="text-sm text-amber-800">{{ lesson.culturalNote }}</p>
      </div>

      <button
        @click="phase = 'exercises'"
        class="mt-auto bg-portuguese-green text-white py-3 rounded-xl font-semibold text-sm active:scale-95 transition-transform"
      >
        Start Exercises →
      </button>
    </div>

    <!-- Phase: Exercises -->
    <div v-else-if="phase === 'exercises'" class="flex-1 flex flex-col p-4">

      <!-- Exercise card -->
      <div class="flex-1">
        <div class="mb-4">
          <span class="text-xs text-gray-400 uppercase tracking-wide">
            {{ exerciseTypeLabel(currentExercise.type) }}
          </span>
        </div>

        <ListenRepeat
          v-if="currentExercise.type === 'listen_repeat'"
          :exercise="currentExercise"
          @correct="handleCorrect"
        />

        <MultipleChoice
          v-else-if="currentExercise.type === 'multiple_choice'"
          :exercise="currentExercise"
          @done="handleMultipleChoiceDone"
        />
      </div>

    </div>

    <!-- Phase: Complete -->
    <div v-else-if="phase === 'complete'" class="flex-1 flex flex-col items-center justify-center p-6 text-center gap-4">
      <div class="text-6xl">{{ score === 100 ? '🏆' : score >= 70 ? '⭐' : '👍' }}</div>
      <h2 class="text-2xl font-bold text-gray-800">
        {{ score === 100 ? 'Perfeito!' : score >= 70 ? 'Muito bem!' : 'Bom trabalho!' }}
      </h2>
      <p class="text-gray-500 text-sm">
        {{ score === 100 ? 'Perfect score!' : `You got ${correctCount} of ${totalExercises} correct.` }}
      </p>

      <!-- XP earned -->
      <div class="bg-green-50 border border-green-200 rounded-2xl px-6 py-4">
        <p class="text-2xl font-bold text-portuguese-green">+{{ xpEarned }} XP</p>
        <p class="text-xs text-gray-500 mt-0.5">{{ score === 100 ? 'Lesson + perfect score bonus!' : 'Lesson complete!' }}</p>
      </div>

      <button
        @click="emit('done')"
        class="mt-2 bg-portuguese-green text-white px-8 py-3 rounded-xl font-semibold text-sm active:scale-95 transition-transform"
      >
        Continue
      </button>
    </div>

    <!-- Exit confirm dialog -->
    <div v-if="showExitConfirm" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
      <div class="bg-white rounded-2xl p-6 w-full max-w-sm text-center">
        <p class="font-bold text-gray-800 mb-2">Leave this lesson?</p>
        <p class="text-sm text-gray-500 mb-5">Your progress in this lesson will be lost.</p>
        <div class="flex gap-3">
          <button @click="showExitConfirm = false" class="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium">Keep going</button>
          <button @click="emit('exit')" class="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-medium">Leave</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Lesson } from '../data/curriculum'
import { useLesson } from '../composables/useLesson'
import { useAudio } from '../composables/useAudio'
import ListenRepeat from './exercises/ListenRepeat.vue'
import MultipleChoice from './exercises/MultipleChoice.vue'

const props = defineProps<{ lesson: Lesson }>()
const emit = defineEmits<{ (e: 'done'): void; (e: 'exit'): void }>()

const { startLesson, completeLesson } = useLesson()
const { speak } = useAudio()

type Phase = 'dialogue' | 'exercises' | 'complete'
const phase = ref<Phase>('dialogue')
const currentIndex = ref(0)
const correctCount = ref(0)
const showExitConfirm = ref(false)
const xpEarned = ref(0)

const totalExercises = computed(() => props.lesson.exercises.length)
const currentExercise = computed(() => props.lesson.exercises[currentIndex.value])
const progressPct = computed(() => Math.round((currentIndex.value / totalExercises.value) * 100))
const score = computed(() => Math.round((correctCount.value / totalExercises.value) * 100))

function exerciseTypeLabel(type: string) {
  const labels: Record<string, string> = {
    listen_repeat: '🔊 Listen & Repeat',
    multiple_choice: '🎯 Multiple Choice',
    fill_blank: '✍️ Fill in the Blank',
  }
  return labels[type] ?? type
}

function handleCorrect() {
  correctCount.value++
  advance()
}

function handleMultipleChoiceDone(correct: boolean) {
  if (correct) correctCount.value++
  advance()
}

function advance() {
  if (currentIndex.value < totalExercises.value - 1) {
    currentIndex.value++
  } else {
    finish()
  }
}

async function finish() {
  const s = score.value
  await completeLesson(props.lesson.id, s)
  xpEarned.value = props.lesson.xpReward + (s === 100 ? 25 : 0)
  phase.value = 'complete'
}

function speakLine(text: string) {
  speak(text)
}

function confirmExit() {
  showExitConfirm.value = true
}

onMounted(() => {
  startLesson(props.lesson.id)
  // Auto-play first audio if it's a dialogue lesson
  if (props.lesson.dialogue?.length) {
    setTimeout(() => speak(props.lesson.dialogue![0].portuguese), 600)
  }
})
</script>
