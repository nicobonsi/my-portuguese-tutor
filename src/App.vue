<template>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Header -->
    <header class="bg-portuguese-green text-white px-4 py-3 flex items-center justify-between shadow-md">
      <div class="flex items-center gap-2">
        <span class="text-2xl">🇵🇹</span>
        <h1 class="text-lg font-semibold tracking-wide">My Portuguese Tutor</h1>
      </div>
    </header>

    <!-- Main content area -->
    <main class="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div class="max-w-md w-full">
        <div class="text-6xl mb-4">🇵🇹</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Bem-vindo!</h2>
        <p class="text-gray-500 text-base mb-6">Your AI-powered Portuguese tutor is being built.</p>
        <div class="bg-gray-50 rounded-xl p-4 text-sm text-gray-400 border border-gray-200">
          Coming soon — lessons, conversations, and more.
        </div>
      </div>
    </main>

    <!-- Bottom nav (mobile-first) -->
    <nav class="border-t border-gray-200 bg-white px-2 py-2 flex justify-around">
      <button class="flex flex-col items-center gap-0.5 px-4 py-1 text-portuguese-green">
        <span class="text-xl">🏠</span>
        <span class="text-xs font-medium">Home</span>
      </button>
      <button class="flex flex-col items-center gap-0.5 px-4 py-1 text-gray-400">
        <span class="text-xl">📚</span>
        <span class="text-xs">Lessons</span>
      </button>
      <button class="flex flex-col items-center gap-0.5 px-4 py-1 text-gray-400">
        <span class="text-xl">💬</span>
        <span class="text-xs">Practice</span>
      </button>
      <button class="flex flex-col items-center gap-0.5 px-4 py-1 text-gray-400">
        <span class="text-xl">👤</span>
        <span class="text-xs">Profile</span>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
// App shell — populated as features are built
</script>

<style>
@import "tailwindcss";

:root {
  --color-portuguese-green: #1a6b3c;
}

.text-portuguese-green {
  color: var(--color-portuguese-green);
}

.bg-portuguese-green {
  background-color: var(--color-portuguese-green);
}
</style>
