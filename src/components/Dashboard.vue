<template>
  <div class="flex flex-col gap-4 p-4 max-w-lg mx-auto w-full">

    <!-- Welcome + Streak -->
    <div class="bg-portuguese-green rounded-2xl p-5 text-white">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-green-200 text-sm">Olá,</p>
          <h2 class="text-xl font-bold">{{ displayName }}</h2>
        </div>
        <div class="text-right">
          <div class="text-3xl font-bold">{{ streak }}</div>
          <div class="text-green-200 text-xs">day streak 🔥</div>
        </div>
      </div>
    </div>

    <!-- Level + XP Bar -->
    <div v-if="gamification.data.value" class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-3">
        <div>
          <span class="text-xs text-gray-400 uppercase tracking-wide">Level {{ xpProgress.current.level }}</span>
          <h3 class="text-base font-bold text-gray-800">{{ xpProgress.current.name }}</h3>
        </div>
        <div class="text-right">
          <span class="text-sm font-semibold text-portuguese-green">{{ gamification.data.value.xp_total }} XP</span>
          <p v-if="xpProgress.nextLevel" class="text-xs text-gray-400">
            {{ xpProgress.xpNeeded - xpProgress.xpInLevel }} to {{ xpProgress.nextLevel.name }}
          </p>
          <p v-else class="text-xs text-gray-400">Max level!</p>
        </div>
      </div>
      <div class="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          class="h-full bg-portuguese-green rounded-full transition-all duration-700"
          :style="{ width: xpProgress.progress + '%' }"
        />
      </div>
    </div>

    <!-- ACESSO A1 Readiness -->
    <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-2">
        <div>
          <p class="text-xs text-gray-400 uppercase tracking-wide">Exam readiness</p>
          <h3 class="text-sm font-bold text-gray-800">ACESSO — A1 🌱</h3>
        </div>
        <span class="text-lg font-bold text-portuguese-green">{{ a1Readiness }}%</span>
      </div>
      <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          class="h-full bg-portuguese-green rounded-full transition-all duration-700"
          :style="{ width: a1Readiness + '%' }"
        />
      </div>
      <p class="text-xs text-gray-400 mt-2">University of Lisbon — valid for life</p>
    </div>

    <!-- Continue Lesson CTA -->
    <div
      v-if="nextLesson"
      @click="emit('start-lesson', nextLesson)"
      class="bg-white border border-portuguese-green rounded-2xl p-5 shadow-sm cursor-pointer active:scale-95 transition-transform"
    >
      <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">Continue learning</p>
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-bold text-gray-800">{{ nextLesson.title }}</h3>
          <p class="text-xs text-gray-500 mt-0.5">{{ nextLesson.titlePt }} · +{{ nextLesson.xpReward }} XP</p>
        </div>
        <div class="bg-portuguese-green text-white w-10 h-10 rounded-full flex items-center justify-center text-lg">
          ▶
        </div>
      </div>
    </div>

    <!-- All done -->
    <div v-else class="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
      <div class="text-3xl mb-1">🏆</div>
      <p class="font-semibold text-gray-800">All A1 lessons complete!</p>
      <p class="text-xs text-gray-500 mt-1">A2 lessons coming soon</p>
    </div>

    <!-- Badges -->
    <div v-if="earnedBadges.length" class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h3 class="text-sm font-semibold text-gray-700 mb-3">Badges</h3>
      <div class="flex flex-wrap gap-2">
        <div
          v-for="badge in earnedBadges"
          :key="badge.id"
          class="bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-1.5 text-xs font-medium text-yellow-800"
          :title="badge.description"
        >
          {{ badge.label }}
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { Lesson } from '../data/curriculum'
import { useAuth } from '../composables/useAuth'
import { useGamification, getXpProgress, BADGES } from '../composables/useGamification'
import { useLesson } from '../composables/useLesson'

const emit = defineEmits<{ (e: 'start-lesson', lesson: Lesson): void }>()

const { user } = useAuth()
const gamification = useGamification()
const { loadProgress, nextLesson, a1Readiness } = useLesson()

const displayName = computed(() =>
  user.value?.user_metadata?.display_name ?? user.value?.email?.split('@')[0] ?? 'Learner'
)
const streak = computed(() => gamification.data.value?.streak_current ?? 0)
const xpProgress = computed(() => getXpProgress(gamification.data.value?.xp_total ?? 0))
const earnedBadges = computed(() => {
  const earned = gamification.data.value?.badges ?? []
  return BADGES.filter(b => earned.includes(b.id))
})

onMounted(async () => {
  await gamification.load()
  await gamification.updateStreak()
  await loadProgress()
})
</script>
