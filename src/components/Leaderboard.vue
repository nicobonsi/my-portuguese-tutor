<template>
  <div class="flex flex-col p-4 max-w-lg mx-auto w-full">

    <h2 class="text-lg font-bold text-gray-800 mb-4">Leaderboard</h2>

    <!-- Tabs -->
    <div class="flex rounded-xl bg-gray-100 p-1 mb-4">
      <button
        @click="tab = 'weekly'"
        :class="tab === 'weekly' ? 'bg-white shadow text-portuguese-green font-semibold' : 'text-gray-500'"
        class="flex-1 py-2 rounded-lg text-sm transition-all"
      >This Week</button>
      <button
        @click="tab = 'alltime'"
        :class="tab === 'alltime' ? 'bg-white shadow text-portuguese-green font-semibold' : 'text-gray-500'"
        class="flex-1 py-2 rounded-lg text-sm transition-all"
      >All Time</button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="w-8 h-8 border-4 border-portuguese-green border-t-transparent rounded-full animate-spin" />
    </div>

    <!-- Empty -->
    <div v-else-if="rows.length === 0" class="text-center py-12 text-gray-400 text-sm">
      No learners yet — be the first!
    </div>

    <!-- Rows -->
    <div v-else class="flex flex-col gap-2">
      <div
        v-for="row in rows"
        :key="row.user_id"
        :class="row.user_id === currentUserId ? 'border-portuguese-green bg-green-50' : 'border-gray-100 bg-white'"
        class="flex items-center gap-3 rounded-2xl border p-3 shadow-sm"
      >
        <!-- Rank -->
        <div class="w-8 text-center">
          <span v-if="row.rank <= 3" class="text-xl">{{ ['🥇','🥈','🥉'][row.rank - 1] }}</span>
          <span v-else class="text-sm font-bold text-gray-400">#{{ row.rank }}</span>
        </div>

        <!-- Avatar -->
        <div
          class="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          :style="{ backgroundColor: row.avatar_color }"
        >{{ initials(row.display_name) }}</div>

        <!-- Name + level -->
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-sm text-gray-800 truncate">
            {{ row.display_name }}
            <span v-if="row.user_id === currentUserId" class="text-portuguese-green text-xs font-normal ml-1">(you)</span>
          </p>
          <p class="text-xs text-gray-400">Level {{ row.level }} · 🔥 {{ row.streak_current }}</p>
        </div>

        <!-- XP -->
        <div class="text-right flex-shrink-0">
          <p class="text-sm font-bold text-portuguese-green">{{ xpLabel(row) }}</p>
          <p class="text-xs text-gray-400">XP</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { supabase } from '../lib/supabase'
import { useAuth } from '../composables/useAuth'

const { user } = useAuth()
const currentUserId = computed(() => user.value?.id)

const tab = ref<'weekly' | 'alltime'>('weekly')
const loading = ref(false)
const rows = ref<any[]>([])
let realtimeSub: any = null

function initials(name: string) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

function xpLabel(row: any) {
  return tab.value === 'weekly' ? row.xp_weekly : row.xp_total
}

async function load() {
  loading.value = true
  const view = tab.value === 'weekly' ? 'leaderboard_weekly' : 'leaderboard_alltime'
  const { data } = await supabase.from(view).select('*').limit(50)
  rows.value = data ?? []
  loading.value = false
}

function subscribeRealtime() {
  realtimeSub = supabase
    .channel('leaderboard')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'user_gamification' }, () => {
      load()
    })
    .subscribe()
}

watch(tab, load)

onMounted(async () => {
  await load()
  subscribeRealtime()
})

onUnmounted(() => {
  if (realtimeSub) supabase.removeChannel(realtimeSub)
})
</script>
