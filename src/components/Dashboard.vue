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
      <!-- Progress bar -->
      <div class="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          class="h-full bg-portuguese-green rounded-full transition-all duration-700"
          :style="{ width: xpProgress.progress + '%' }"
        />
      </div>
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

    <!-- Continue Learning CTA -->
    <div class="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-center">
      <div class="text-3xl mb-2">📚</div>
      <h3 class="font-semibold text-gray-800 mb-1">Ready to learn?</h3>
      <p class="text-sm text-gray-500 mb-4">Lessons are coming soon. Keep your streak alive!</p>
      <button
        disabled
        class="bg-portuguese-green text-white text-sm font-semibold px-6 py-2.5 rounded-xl opacity-40 cursor-not-allowed"
      >
        Start Lesson
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useGamification, getXpProgress, BADGES } from '../composables/useGamification'

const { user } = useAuth()
const gamification = useGamification()

const displayName = computed(() => {
  return user.value?.user_metadata?.display_name
    ?? user.value?.email?.split('@')[0]
    ?? 'Learner'
})

const streak = computed(() => gamification.data.value?.streak_current ?? 0)

const xpProgress = computed(() =>
  getXpProgress(gamification.data.value?.xp_total ?? 0)
)

const earnedBadges = computed(() => {
  const earned = gamification.data.value?.badges ?? []
  return BADGES.filter(b => earned.includes(b.id))
})

onMounted(async () => {
  await gamification.load()
  await gamification.updateStreak()
})
</script>
