import { ref } from 'vue'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

export interface GamificationData {
  xp_total: number
  level: number
  streak_current: number
  streak_longest: number
  streak_freeze_available: boolean
  last_active_date: string | null
  badges: string[]
}

export const LEVELS = [
  { level: 1, name: 'Beginner',     xp: 0 },
  { level: 2, name: 'Explorer',     xp: 200 },
  { level: 3, name: 'Adventurer',   xp: 500 },
  { level: 4, name: 'Traveller',    xp: 1000 },
  { level: 5, name: 'Local',        xp: 2000 },
  { level: 6, name: 'Speaker',      xp: 4000 },
  { level: 7, name: 'Fluent',       xp: 7500 },
  { level: 8, name: 'Native Heart', xp: 12000 },
]

export const XP_REWARDS = {
  lesson_complete: 50,
  lesson_perfect: 25,
  vocab_review: 10,
  daily_streak: 20,
  first_attempt: 10,
  chapter_complete: 100,
}

export const BADGES = [
  { id: 'first_step',       label: 'First Step',        description: 'Complete your first lesson' },
  { id: 'hot_streak',       label: 'Hot Streak',         description: '7-day streak' },
  { id: 'on_fire',          label: 'On Fire',            description: '30-day streak' },
  { id: 'perfectionist',    label: 'Perfectionist',      description: '5 perfect scores in a row' },
  { id: 'vocab_builder',    label: 'Vocabulary Builder', description: '100 words mastered' },
  { id: 'chapter_champion', label: 'Chapter Champion',   description: 'Complete a full chapter' },
  { id: 'speed_learner',    label: 'Speed Learner',      description: '3 lessons in one day' },
  { id: 'comeback_kid',     label: 'Comeback Kid',       description: 'Return after 7+ days away' },
]

export function getLevelForXp(xp: number) {
  let current = LEVELS[0]
  for (const l of LEVELS) {
    if (xp >= l.xp) current = l
    else break
  }
  return current
}

export function getXpProgress(xp: number) {
  const current = getLevelForXp(xp)
  const nextLevel = LEVELS.find(l => l.level === current.level + 1)
  if (!nextLevel) return { current, nextLevel: null, progress: 100, xpInLevel: 0, xpNeeded: 0 }
  const xpInLevel = xp - current.xp
  const xpNeeded = nextLevel.xp - current.xp
  return { current, nextLevel, progress: Math.round((xpInLevel / xpNeeded) * 100), xpInLevel, xpNeeded }
}

export function useGamification() {
  const { user } = useAuth()
  const data = ref<GamificationData | null>(null)
  const loading = ref(false)

  async function load() {
    if (!user.value) return
    loading.value = true
    const { data: row } = await supabase
      .from('user_gamification')
      .select('*')
      .eq('user_id', user.value.id)
      .single()
    data.value = row
    loading.value = false
  }

  async function awardXp(amount: number, reason: keyof typeof XP_REWARDS | string) {
    if (!user.value || !data.value) return

    // Log the XP event
    await supabase.from('xp_events').insert({ user_id: user.value.id, amount, reason })

    // Update totals
    const newXp = data.value.xp_total + amount
    const newLevel = getLevelForXp(newXp).level
    const leveledUp = newLevel > data.value.level

    await supabase.from('user_gamification').update({
      xp_total: newXp,
      level: newLevel,
      updated_at: new Date().toISOString(),
    }).eq('user_id', user.value.id)

    data.value.xp_total = newXp
    data.value.level = newLevel

    return { leveledUp, newLevel }
  }

  async function updateStreak() {
    if (!user.value || !data.value) return
    const today = new Date().toISOString().slice(0, 10)
    const last = data.value.last_active_date

    if (last === today) return // already updated today

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    const newStreak = last === yesterday ? data.value.streak_current + 1 : 1
    const newLongest = Math.max(newStreak, data.value.streak_longest)

    await supabase.from('user_gamification').update({
      streak_current: newStreak,
      streak_longest: newLongest,
      last_active_date: today,
      updated_at: new Date().toISOString(),
    }).eq('user_id', user.value.id)

    data.value.streak_current = newStreak
    data.value.streak_longest = newLongest
    data.value.last_active_date = today

    if (newStreak > 1) await awardXp(XP_REWARDS.daily_streak, 'daily_streak')
  }

  async function awardBadge(badgeId: string) {
    if (!user.value || !data.value) return
    if (data.value.badges.includes(badgeId)) return

    const newBadges = [...data.value.badges, badgeId]
    await supabase.from('user_gamification').update({
      badges: newBadges,
      updated_at: new Date().toISOString(),
    }).eq('user_id', user.value.id)

    data.value.badges = newBadges
  }

  return { data, loading, load, awardXp, updateStreak, awardBadge }
}
