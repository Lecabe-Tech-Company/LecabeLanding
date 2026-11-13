<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { enableAnalytics, getAnalyticsConsent, setAnalyticsConsent } from '@/plugins/analytics'

const router = useRouter()
const choice = ref(getAnalyticsConsent())
const showBanner = ref(choice.value === null)

if (choice.value === 'accepted') {
  enableAnalytics(router)
}

function choose(value: 'accepted' | 'rejected'): void {
  setAnalyticsConsent(value, router)
  choice.value = value
  showBanner.value = false
}
</script>

<template>
  <div v-if="showBanner" role="region" aria-label="Preferências de cookies" class="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-5 shadow-2xl dark:border-gray-700 dark:bg-[#1e202d]">
    <p class="mb-2 font-semibold text-gray-900 dark:text-white">Privacidade e análise de visitas</p>
    <p class="mb-4 text-sm text-gray-700 dark:text-gray-300">
      Usamos o Google Analytics para entender visitas e melhorar nossos serviços apenas com sua autorização.
      Você pode recusar ou alterar sua escolha a qualquer momento.
      <RouterLink to="/politica-de-privacidade" class="underline">Política de privacidade</RouterLink>.
    </p>
    <div class="flex flex-wrap gap-3">
      <button type="button" class="rounded-lg bg-brand-primary px-4 py-2 font-medium text-white" @click="choose('accepted')">Aceitar analytics</button>
      <button type="button" class="rounded-lg border border-gray-400 px-4 py-2 text-gray-900 dark:text-white" @click="choose('rejected')">Recusar</button>
    </div>
  </div>
  <button v-else type="button" class="fixed bottom-3 left-3 z-[99] rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-800 shadow-lg dark:border-gray-700 dark:bg-[#1e202d] dark:text-white" @click="showBanner = true">
    Privacidade
  </button>
</template>
