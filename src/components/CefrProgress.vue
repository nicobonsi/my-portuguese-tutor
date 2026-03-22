<template>
  <div class="bg-white rounded-t-3xl w-full max-h-[85vh] overflow-y-auto p-6">
    <div class="flex items-center justify-between mb-5">
      <h2 class="text-lg font-bold text-gray-800">Official CAPLE Exams</h2>
      <button @click="emit('close')" class="text-gray-400 text-xl">✕</button>
    </div>

    <p class="text-sm text-gray-500 mb-5">
      Portugal's official language certificates, issued by the University of Lisbon.
      All certificates are <strong>valid for life</strong>.
    </p>

    <!-- Level cards -->
    <div class="flex flex-col gap-3">
      <div
        v-for="exam in cefrExams"
        :key="exam.level"
        :class="cardClass(exam.level)"
        class="rounded-2xl border p-4"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span :class="levelBadgeClass(exam.level)" class="text-xs font-bold px-2.5 py-0.5 rounded-full">
                {{ exam.level }}
              </span>
              <span class="font-bold text-gray-800 text-sm">{{ exam.exam }}</span>
              <span v-if="isCurrentTarget(exam.level)" class="text-xs bg-green-100 text-portuguese-green px-2 py-0.5 rounded-full font-medium">
                Current goal
              </span>
            </div>
            <p class="text-xs text-gray-500 mb-1">{{ exam.fullName }}</p>
            <p class="text-xs text-gray-600">{{ exam.description }}</p>
            <p class="text-xs text-gray-400 mt-1">Fee: {{ exam.fee }} · Pass: 55%</p>
          </div>
          <div class="flex-shrink-0 text-right">
            <div class="text-2xl">{{ levelEmoji(exam.level) }}</div>
            <p v-if="readinessForLevel(exam.level) > 0" class="text-xs text-portuguese-green font-semibold mt-1">
              {{ readinessForLevel(exam.level) }}%
            </p>
          </div>
        </div>

        <!-- Readiness bar (only for levels with content) -->
        <div v-if="readinessForLevel(exam.level) > 0" class="mt-3">
          <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              class="h-full bg-portuguese-green rounded-full transition-all duration-700"
              :style="{ width: readinessForLevel(exam.level) + '%' }"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Register link -->
    <div class="mt-5 bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center">
      <p class="text-xs text-gray-500 mb-2">Ready to register for an exam?</p>
      <a
        href="https://caple.letras.ulisboa.pt/inscricao"
        target="_blank"
        rel="noopener"
        class="text-sm text-portuguese-green font-semibold underline"
      >
        caple.letras.ulisboa.pt →
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cefrExams } from '../data/curriculum'
import type { CefrLevel } from '../data/curriculum'
import { useLesson } from '../composables/useLesson'

const emit = defineEmits<{ (e: 'close'): void }>()
const { a1Readiness } = useLesson()

function readinessForLevel(level: CefrLevel): number {
  if (level === 'A1') return a1Readiness.value
  return 0 // future levels
}

function isCurrentTarget(level: CefrLevel) {
  return level === 'A1'
}

function levelEmoji(level: CefrLevel) {
  const map: Record<CefrLevel, string> = {
    A1: '🌱', A2: '🌿', B1: '🌳', B2: '⭐', C1: '🏅', C2: '🏆',
  }
  return map[level]
}

function levelBadgeClass(level: CefrLevel) {
  const map: Record<CefrLevel, string> = {
    A1: 'bg-green-100 text-green-700',
    A2: 'bg-blue-100 text-blue-700',
    B1: 'bg-yellow-100 text-yellow-700',
    B2: 'bg-orange-100 text-orange-700',
    C1: 'bg-red-100 text-red-700',
    C2: 'bg-purple-100 text-purple-700',
  }
  return map[level]
}

function cardClass(level: CefrLevel) {
  if (isCurrentTarget(level)) return 'border-portuguese-green bg-green-50'
  return 'border-gray-100 bg-white'
}
</script>
