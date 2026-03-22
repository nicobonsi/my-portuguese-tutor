<template>
  <div class="flex flex-col p-4 max-w-lg mx-auto w-full gap-6">

    <!-- CEFR level indicator -->
    <div class="bg-portuguese-green rounded-2xl p-4 text-white flex items-center justify-between">
      <div>
        <p class="text-green-200 text-xs uppercase tracking-wide">Working towards</p>
        <h2 class="text-lg font-bold">ACESSO — A1</h2>
        <p class="text-green-200 text-xs mt-0.5">{{ a1Readiness }}% exam ready</p>
      </div>
      <div class="text-right">
        <div class="text-3xl font-bold">{{ a1Readiness }}%</div>
        <button
          @click="showCefr = true"
          class="text-green-200 text-xs underline mt-1"
        >View all levels</button>
      </div>
    </div>

    <!-- A1 progress bar -->
    <div class="h-2 bg-gray-100 rounded-full overflow-hidden -mt-3">
      <div
        class="h-full bg-portuguese-green rounded-full transition-all duration-700"
        :style="{ width: a1Readiness + '%' }"
      />
    </div>

    <!-- Modules -->
    <div v-for="mod in curriculum" :key="mod.id" class="flex flex-col gap-2">

      <!-- Module header -->
      <div class="flex items-center gap-3 px-1">
        <div class="h-px flex-1 bg-gray-200" />
        <span class="text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
          {{ mod.titlePt }}
        </span>
        <div class="h-px flex-1 bg-gray-200" />
      </div>

      <!-- Lesson nodes -->
      <div v-for="lesson in mod.lessons" :key="lesson.id">
        <button
          @click="openLesson(lesson)"
          :disabled="!isLessonUnlocked(lesson.id)"
          :class="lessonNodeClass(lesson.id)"
          class="w-full text-left rounded-2xl p-4 border transition-all active:scale-95"
        >
          <div class="flex items-center gap-3">
            <!-- Status icon -->
            <div :class="lessonIconClass(lesson.id)" class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg">
              {{ lessonIcon(lesson.id) }}
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <p class="font-semibold text-sm" :class="isLessonUnlocked(lesson.id) ? 'text-gray-800' : 'text-gray-400'">
                  {{ lesson.title }}
                </p>
                <span class="text-xs px-2 py-0.5 rounded-full bg-green-100 text-portuguese-green font-medium">
                  {{ lesson.cefrLevel }}
                </span>
              </div>
              <p class="text-xs mt-0.5" :class="isLessonUnlocked(lesson.id) ? 'text-gray-500' : 'text-gray-300'">
                {{ lesson.titlePt }}
              </p>
              <div class="flex items-center gap-3 mt-1">
                <span class="text-xs text-gray-400">+{{ lesson.xpReward }} XP</span>
                <span v-if="getProgress(lesson.id).score !== null" class="text-xs text-portuguese-green font-medium">
                  Score: {{ getProgress(lesson.id).score }}%
                </span>
              </div>
            </div>

            <!-- Arrow -->
            <div v-if="isLessonUnlocked(lesson.id) && getProgress(lesson.id).status !== 'complete'" class="text-gray-300 flex-shrink-0">›</div>
          </div>
        </button>
      </div>

    </div>

    <!-- CEFR Modal -->
    <div v-if="showCefr" class="fixed inset-0 bg-black/50 z-50 flex items-end" @click.self="showCefr = false">
      <CefrProgress @close="showCefr = false" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { curriculum } from '../data/curriculum'
import type { Lesson } from '../data/curriculum'
import { useLesson } from '../composables/useLesson'
import CefrProgress from './CefrProgress.vue'

const emit = defineEmits<{ (e: 'open-lesson', lesson: Lesson): void }>()

const { loadProgress, getProgress, isLessonUnlocked, a1Readiness } = useLesson()
const showCefr = ref(false)

function lessonNodeClass(id: string) {
  const p = getProgress(id)
  const unlocked = isLessonUnlocked(id)
  if (!unlocked) return 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
  if (p.status === 'complete') return 'border-green-200 bg-green-50'
  if (p.status === 'in_progress') return 'border-yellow-300 bg-yellow-50'
  return 'border-gray-200 bg-white hover:border-portuguese-green'
}

function lessonIconClass(id: string) {
  const p = getProgress(id)
  const unlocked = isLessonUnlocked(id)
  if (!unlocked) return 'bg-gray-100'
  if (p.status === 'complete') return 'bg-green-100'
  if (p.status === 'in_progress') return 'bg-yellow-100'
  return 'bg-gray-100'
}

function lessonIcon(id: string) {
  const p = getProgress(id)
  const unlocked = isLessonUnlocked(id)
  if (!unlocked) return '🔒'
  if (p.status === 'complete') return '✅'
  if (p.status === 'in_progress') return '▶️'
  return '📖'
}

function openLesson(lesson: Lesson) {
  if (!isLessonUnlocked(lesson.id)) return
  emit('open-lesson', lesson)
}

onMounted(loadProgress)
</script>
