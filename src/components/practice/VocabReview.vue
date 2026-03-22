<template>
  <div class="flex flex-col gap-4">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <h3 class="font-bold text-gray-800">Vocabulary Review</h3>
      <button @click="emit('done')" class="text-gray-400 text-sm">✕ Exit</button>
    </div>

    <!-- Progress -->
    <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        class="h-full bg-portuguese-green rounded-full transition-all duration-500"
        :style="{ width: progressPct + '%' }"
      />
    </div>
    <p class="text-xs text-gray-400 text-center -mt-2">{{ current + 1 }} of {{ cards.length }} cards</p>

    <!-- Done -->
    <div v-if="done" class="text-center py-8 flex flex-col items-center gap-4">
      <div class="text-5xl">🎉</div>
      <h3 class="text-xl font-bold text-gray-800">Review complete!</h3>
      <p class="text-sm text-gray-500">{{ correct }} / {{ cards.length }} correct</p>
      <div class="bg-green-50 border border-green-200 rounded-2xl px-6 py-3">
        <p class="text-xl font-bold text-portuguese-green">+{{ xpEarned }} XP</p>
      </div>
      <button @click="emit('done')" class="bg-portuguese-green text-white px-8 py-3 rounded-xl font-semibold text-sm">
        Back to Practice
      </button>
    </div>

    <!-- Card -->
    <div v-else class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

      <!-- Front: Portuguese -->
      <div class="text-center mb-6">
        <p class="text-xs text-gray-400 uppercase tracking-wide mb-2">What does this mean?</p>
        <p class="text-3xl font-bold text-gray-800">{{ card.portuguese }}</p>
        <p v-if="card.phonetic" class="text-sm text-gray-400 font-mono mt-2">{{ card.phonetic }}</p>
        <button
          @click="playWord"
          class="mt-3 inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm active:scale-95 transition-all"
        >
          🔊 Hear it
        </button>
      </div>

      <!-- Example -->
      <p v-if="card.example && revealed" class="text-sm text-gray-500 text-center italic mb-4">
        "{{ card.example }}"
      </p>

      <!-- Reveal button -->
      <button
        v-if="!revealed"
        @click="reveal"
        class="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium text-sm active:scale-95 transition-all"
      >
        Show answer
      </button>

      <!-- Answer + feedback -->
      <div v-else class="flex flex-col gap-3">
        <div class="bg-gray-50 rounded-xl p-3 text-center">
          <p class="text-lg font-semibold text-gray-800">{{ card.english }}</p>
        </div>
        <p class="text-sm text-gray-500 text-center">Did you know it?</p>
        <div class="flex gap-3">
          <button
            @click="answer(false)"
            class="flex-1 bg-red-50 border border-red-200 text-red-700 py-3 rounded-xl font-medium text-sm active:scale-95 transition-all"
          >
            ✗ Not yet
          </button>
          <button
            @click="answer(true)"
            class="flex-1 bg-green-50 border border-green-200 text-green-700 py-3 rounded-xl font-medium text-sm active:scale-95 transition-all"
          >
            ✓ Got it!
          </button>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLesson } from '../../composables/useLesson'
import { useGamification, XP_REWARDS } from '../../composables/useGamification'
import { useAudio } from '../../composables/useAudio'
import { allLessons } from '../../data/curriculum'
import type { VocabItem } from '../../data/curriculum'

const emit = defineEmits<{ (e: 'done'): void }>()

const { progressMap } = useLesson()
const gamification = useGamification()
const { speak } = useAudio()

const cards = ref<VocabItem[]>([])
const current = ref(0)
const revealed = ref(false)
const correct = ref(0)
const done = ref(false)
const xpEarned = ref(0)

const card = computed(() => cards.value[current.value])
const progressPct = computed(() => Math.round((current.value / Math.max(cards.value.length, 1)) * 100))

function buildCards() {
  // Pull vocab from completed lessons, shuffle, take up to 20
  const completedIds = Object.entries(progressMap.value)
    .filter(([, p]) => p.status === 'complete')
    .map(([id]) => id)

  const vocab: VocabItem[] = []
  for (const lesson of allLessons) {
    if (completedIds.includes(lesson.id)) {
      vocab.push(...lesson.vocabulary)
    }
  }

  // Shuffle and cap at 20
  const shuffled = vocab.sort(() => Math.random() - 0.5).slice(0, 20)
  cards.value = shuffled.length > 0 ? shuffled : allLessons[0].vocabulary.slice(0, 5)
}

function reveal() {
  revealed.value = true
  if (card.value) speak(card.value.portuguese)
}

function playWord() {
  if (card.value) speak(card.value.portuguese)
}

async function answer(knew: boolean) {
  if (knew) correct.value++

  if (current.value < cards.value.length - 1) {
    current.value++
    revealed.value = false
  } else {
    // Session complete
    const earned = correct.value * XP_REWARDS.vocab_review
    xpEarned.value = earned
    await gamification.load()
    await gamification.awardXp(earned, 'vocab_review')
    done.value = true
  }
}

onMounted(() => {
  buildCards()
  gamification.load()
})
</script>
