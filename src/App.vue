<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">

    <!-- Auth screen -->
    <AuthScreen v-if="!isLoggedIn && !loading" />

    <!-- Loading spinner -->
    <div v-else-if="loading" class="flex-1 flex items-center justify-center">
      <div class="w-10 h-10 border-4 border-portuguese-green border-t-transparent rounded-full animate-spin" />
    </div>

    <!-- Lesson fullscreen view (overlays everything) -->
    <LessonView
      v-else-if="activeLesson"
      :lesson="activeLesson"
      @done="onLessonDone"
      @exit="activeLesson = null"
    />

    <!-- App shell -->
    <template v-else-if="isLoggedIn">
      <header class="bg-portuguese-green text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div class="flex items-center gap-2">
          <span class="text-2xl">🇵🇹</span>
          <h1 class="text-lg font-semibold tracking-wide">My Portuguese Tutor</h1>
        </div>
        <button @click="handleSignOut" class="text-green-200 text-sm hover:text-white transition-colors">
          Sign out
        </button>
      </header>

      <main class="flex-1 overflow-y-auto pb-20">
        <Dashboard v-if="activeTab === 'home'" @start-lesson="openLesson" />
        <CurriculumPath v-else-if="activeTab === 'lessons'" @open-lesson="openLesson" />
        <PracticeHub v-else-if="activeTab === 'practice'" />
        <Leaderboard v-else-if="activeTab === 'leaderboard'" />
        <div v-else class="flex flex-col items-center justify-center h-full p-8 text-center text-gray-400">
          <div class="text-4xl mb-3">🚧</div>
          <p class="text-sm">Coming soon</p>
        </div>
      </main>

      <!-- Bottom nav -->
      <nav class="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-2 py-2 flex justify-around">
        <button
          v-for="item in navItems"
          :key="item.id"
          @click="activeTab = item.id"
          :class="activeTab === item.id ? 'text-portuguese-green' : 'text-gray-400'"
          class="flex flex-col items-center gap-0.5 px-4 py-1"
        >
          <span class="text-xl">{{ item.icon }}</span>
          <span class="text-xs" :class="activeTab === item.id ? 'font-medium' : ''">{{ item.label }}</span>
        </button>
      </nav>
    </template>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from './composables/useAuth'
import type { Lesson } from './data/curriculum'
import AuthScreen from './components/AuthScreen.vue'
import Dashboard from './components/Dashboard.vue'
import CurriculumPath from './components/CurriculumPath.vue'
import LessonView from './components/LessonView.vue'
import Leaderboard from './components/Leaderboard.vue'
import PracticeHub from './components/PracticeHub.vue'

const { isLoggedIn, loading, signOut } = useAuth()

const activeTab = ref('home')
const activeLesson = ref<Lesson | null>(null)

const navItems = [
  { id: 'home',        icon: '🏠', label: 'Home' },
  { id: 'lessons',     icon: '📚', label: 'Lessons' },
  { id: 'practice',    icon: '💬', label: 'Practice' },
  { id: 'leaderboard', icon: '🏆', label: 'Ranking' },
  { id: 'profile',     icon: '👤', label: 'Profile' },
]

function openLesson(lesson: Lesson) {
  activeLesson.value = lesson
}

function onLessonDone() {
  activeLesson.value = null
  activeTab.value = 'lessons'
}

async function handleSignOut() {
  await signOut()
  activeTab.value = 'home'
  activeLesson.value = null
}
</script>

<style>
@import "tailwindcss";

:root {
  --color-portuguese-green: #1a6b3c;
}

.text-portuguese-green { color: var(--color-portuguese-green); }
.bg-portuguese-green { background-color: var(--color-portuguese-green); }
.border-portuguese-green { border-color: var(--color-portuguese-green); }
</style>
