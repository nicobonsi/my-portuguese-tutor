<template>
  <div class="flex flex-col p-4 max-w-lg mx-auto w-full gap-4">

    <h2 class="text-lg font-bold text-gray-800">Practice</h2>
    <p class="text-sm text-gray-500 -mt-2">Reinforce what you've learned with targeted drills.</p>

    <!-- Active practice session -->
    <VocabReview v-if="activeMode === 'vocab'" @done="activeMode = null" />
    <ListeningDrill v-else-if="activeMode === 'listening'" @done="activeMode = null" />
    <GrammarDrill v-else-if="activeMode === 'grammar'" @done="activeMode = null" />

    <!-- Practice mode picker -->
    <template v-else>

      <!-- Vocab review card -->
      <div
        @click="activeMode = 'vocab'"
        class="bg-white border border-gray-200 rounded-2xl p-5 cursor-pointer hover:border-portuguese-green active:scale-95 transition-all shadow-sm"
      >
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🃏</div>
          <div>
            <h3 class="font-bold text-gray-800">Vocabulary Review</h3>
            <p class="text-sm text-gray-500 mt-0.5">Flashcards from your lessons — spaced repetition.</p>
            <p class="text-xs text-portuguese-green font-medium mt-1">{{ dueCount }} cards due · +10 XP each</p>
          </div>
        </div>
      </div>

      <!-- Listening drill card -->
      <div
        @click="activeMode = 'listening'"
        class="bg-white border border-gray-200 rounded-2xl p-5 cursor-pointer hover:border-portuguese-green active:scale-95 transition-all shadow-sm"
      >
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🔊</div>
          <div>
            <h3 class="font-bold text-gray-800">Listening Drill</h3>
            <p class="text-sm text-gray-500 mt-0.5">Hear a phrase in EP, pick the correct meaning.</p>
            <p class="text-xs text-portuguese-green font-medium mt-1">10 random phrases · +15 XP</p>
          </div>
        </div>
      </div>

      <!-- Grammar drill card -->
      <div
        @click="activeMode = 'grammar'"
        class="bg-white border border-gray-200 rounded-2xl p-5 cursor-pointer hover:border-portuguese-green active:scale-95 transition-all shadow-sm"
      >
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">✏️</div>
          <div>
            <h3 class="font-bold text-gray-800">Grammar Drill</h3>
            <p class="text-sm text-gray-500 mt-0.5">Targeted grammar exercises from your level.</p>
            <p class="text-xs text-portuguese-green font-medium mt-1">10 exercises · +20 XP</p>
          </div>
        </div>
      </div>

      <!-- No lessons yet -->
      <div v-if="!hasCompletedLessons" class="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800 text-center">
        Complete your first lesson to unlock practice sessions!
      </div>

    </template>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLesson } from '../composables/useLesson'
import VocabReview from './practice/VocabReview.vue'
import ListeningDrill from './practice/ListeningDrill.vue'
import GrammarDrill from './practice/GrammarDrill.vue'

const { loadProgress, progressMap } = useLesson()

const activeMode = ref<'vocab' | 'listening' | 'grammar' | null>(null)

const hasCompletedLessons = computed(() =>
  Object.values(progressMap.value).some(p => p.status === 'complete')
)

const dueCount = computed(() => {
  // Simplified: count vocab from completed lessons
  return Object.values(progressMap.value).filter(p => p.status === 'complete').length * 3
})

onMounted(loadProgress)
</script>
