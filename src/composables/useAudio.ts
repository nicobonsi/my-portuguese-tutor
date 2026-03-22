import { ref } from 'vue'

const speaking = ref(false)
const supported = ref(typeof window !== 'undefined' && 'speechSynthesis' in window)

let preferredVoice: SpeechSynthesisVoice | null = null

function findEPVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices()
  // Prefer pt-PT voices (European Portuguese)
  const ptPT = voices.find(v => v.lang === 'pt-PT')
  if (ptPT) return ptPT
  // Fall back to any pt-* voice
  return voices.find(v => v.lang.startsWith('pt')) ?? null
}

// Voices load asynchronously — cache on first call and on voiceschanged
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    preferredVoice = findEPVoice()
  }
  // Try immediately (Chrome sometimes has voices ready)
  preferredVoice = findEPVoice()
}

export function useAudio() {
  function speak(text: string, rate = 0.85): Promise<void> {
    if (!supported.value) return Promise.resolve()

    return new Promise((resolve) => {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'pt-PT'
      utterance.rate = rate
      utterance.pitch = 1

      // Try to use cached EP voice; re-search if not found
      const voice = preferredVoice ?? findEPVoice()
      if (voice) utterance.voice = voice

      utterance.onstart = () => { speaking.value = true }
      utterance.onend = () => { speaking.value = false; resolve() }
      utterance.onerror = () => { speaking.value = false; resolve() }

      window.speechSynthesis.speak(utterance)
    })
  }

  function speakSlow(text: string) {
    return speak(text, 0.6)
  }

  function stop() {
    window.speechSynthesis.cancel()
    speaking.value = false
  }

  return { speak, speakSlow, stop, speaking, supported }
}
