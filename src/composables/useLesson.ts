import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import { useGamification, XP_REWARDS } from './useGamification'
import { allLessons, getLessonById } from '../data/curriculum'
import type { Lesson } from '../data/curriculum'

export interface LessonProgress {
  lesson_id: string
  status: 'not_started' | 'in_progress' | 'complete'
  score: number | null
  attempts: number
}

const progressMap = ref<Record<string, LessonProgress>>({})
const loaded = ref(false)

export function useLesson() {
  const { user } = useAuth()
  const gamification = useGamification()

  async function loadProgress() {
    if (!user.value || loaded.value) return
    const { data } = await supabase
      .from('user_progress')
      .select('lesson_id, status, score, attempts')
      .eq('user_id', user.value.id)

    if (data) {
      progressMap.value = Object.fromEntries(data.map(r => [r.lesson_id, r]))
    }
    loaded.value = true
  }

  function getProgress(lessonId: string): LessonProgress {
    return progressMap.value[lessonId] ?? {
      lesson_id: lessonId,
      status: 'not_started',
      score: null,
      attempts: 0,
    }
  }

  function isLessonUnlocked(lessonId: string): boolean {
    const idx = allLessons.findIndex(l => l.id === lessonId)
    if (idx === 0) return true
    const prev = allLessons[idx - 1]
    return getProgress(prev.id).status === 'complete'
  }

  async function startLesson(lessonId: string) {
    if (!user.value) return
    const prog = getProgress(lessonId)
    if (prog.status === 'complete') return

    const update = { status: 'in_progress' as const, attempts: prog.attempts + 1 }
    await supabase.from('user_progress').upsert({
      user_id: user.value.id,
      lesson_id: lessonId,
      ...update,
      updated_at: new Date().toISOString(),
    })
    progressMap.value[lessonId] = { ...prog, ...update }
  }

  async function completeLesson(lessonId: string, score: number) {
    if (!user.value) return

    const prog = getProgress(lessonId)
    const lesson = getLessonById(lessonId)
    if (!lesson) return

    const isPerfect = score === 100
    const wasComplete = prog.status === 'complete'

    const update = { status: 'complete' as const, score, attempts: prog.attempts }
    await supabase.from('user_progress').upsert({
      user_id: user.value.id,
      lesson_id: lessonId,
      ...update,
      updated_at: new Date().toISOString(),
    })
    progressMap.value[lessonId] = { ...prog, ...update }

    // Award XP (only on first completion)
    if (!wasComplete) {
      await gamification.load()
      let xp = lesson.xpReward
      await gamification.awardXp(xp, 'lesson_complete')
      if (isPerfect) await gamification.awardXp(XP_REWARDS.lesson_perfect, 'lesson_perfect')

      // Badge: first lesson ever
      const completedCount = Object.values(progressMap.value).filter(p => p.status === 'complete').length
      if (completedCount === 1) await gamification.awardBadge('first_step')
    }

    return { isPerfect }
  }

  // Returns the next lesson to do (first incomplete)
  const nextLesson = computed<Lesson | null>(() => {
    for (const lesson of allLessons) {
      const p = getProgress(lesson.id)
      if (p.status !== 'complete') return lesson
    }
    return null
  })

  // A1 readiness: % of A1 lessons completed
  const a1Readiness = computed(() => {
    const a1Lessons = allLessons.filter(l => l.cefrLevel === 'A1')
    const done = a1Lessons.filter(l => getProgress(l.id).status === 'complete').length
    return Math.round((done / a1Lessons.length) * 100)
  })

  return {
    loadProgress,
    getProgress,
    isLessonUnlocked,
    startLesson,
    completeLesson,
    nextLesson,
    a1Readiness,
    progressMap,
  }
}
