<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center p-6">
    <div class="w-full max-w-sm">

      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="text-6xl mb-3">🇵🇹</div>
        <h1 class="text-2xl font-bold text-gray-800">My Portuguese Tutor</h1>
        <p class="text-gray-500 text-sm mt-1">Learn European Portuguese</p>
      </div>

      <!-- Tabs -->
      <div class="flex rounded-xl bg-gray-100 p-1 mb-6">
        <button
          @click="mode = 'login'"
          :class="mode === 'login' ? 'bg-white shadow text-portuguese-green font-semibold' : 'text-gray-500'"
          class="flex-1 py-2 rounded-lg text-sm transition-all"
        >Sign In</button>
        <button
          @click="mode = 'signup'"
          :class="mode === 'signup' ? 'bg-white shadow text-portuguese-green font-semibold' : 'text-gray-500'"
          class="flex-1 py-2 rounded-lg text-sm transition-all"
        >Sign Up</button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submit" class="flex flex-col gap-4">
        <div v-if="mode === 'signup'">
          <label class="text-sm font-medium text-gray-700 block mb-1">Display Name</label>
          <input
            v-model="displayName"
            type="text"
            placeholder="How should we call you?"
            required
            class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-portuguese-green"
          />
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700 block mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="your@email.com"
            required
            class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-portuguese-green"
          />
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700 block mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
            minlength="6"
            class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-portuguese-green"
          />
        </div>

        <!-- Error -->
        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>

        <!-- Success (signup confirmation) -->
        <p v-if="success" class="text-green-600 text-sm text-center">{{ success }}</p>

        <button
          type="submit"
          :disabled="submitting"
          class="bg-portuguese-green text-white py-3 rounded-xl font-semibold text-sm disabled:opacity-60 active:scale-95 transition-transform"
        >
          {{ submitting ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account' }}
        </button>
      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'

const { signIn, signUp } = useAuth()

const mode = ref<'login' | 'signup'>('login')
const email = ref('')
const password = ref('')
const displayName = ref('')
const submitting = ref(false)
const error = ref('')
const success = ref('')

async function submit() {
  error.value = ''
  success.value = ''
  submitting.value = true
  try {
    if (mode.value === 'login') {
      await signIn(email.value, password.value)
    } else {
      await signUp(email.value, password.value, displayName.value)
      success.value = 'Account created! Check your email to confirm, then sign in.'
      mode.value = 'login'
    }
  } catch (e: any) {
    error.value = e.message ?? 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>
