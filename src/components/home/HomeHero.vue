<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AutomationConsole from '@/components/home/AutomationConsole.vue'

defineProps<{ whatsappUrl: string }>()
const { t } = useI18n()
</script>

<template>
  <section aria-labelledby="home-hero-title" class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(950px_460px_at_50%_-10%,rgba(79,82,255,.075),transparent_70%)] dark:bg-[radial-gradient(950px_460px_at_50%_-10%,rgba(79,82,255,.17),transparent_70%)]" aria-hidden="true" />
    <div class="relative mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-8 md:pt-20 lg:px-12">
      <div class="mx-auto flex max-w-4xl flex-col items-center text-center">
        <p class="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/[.055] px-4 py-1.5 text-[12px] font-semibold text-brand-dark-primary dark:border-brand-light-primary/25 dark:bg-brand-light-primary/10 dark:text-brand-light-primary">
          <span class="h-1.5 w-1.5 rounded-full bg-brand-alternative" aria-hidden="true" /> {{ t('hero.badge') }}
        </p>
        <!-- H1 must be visible immediately to avoid delaying LCP -->
        <h1 id="home-hero-title" class="mt-6 max-w-[940px] text-[clamp(2.4rem,5.1vw,4.6rem)] font-extrabold leading-[1.035] tracking-[-.045em] text-gray-900 dark:text-white">
          {{ t('hero.title') }}
        </h1>
        <p class="mt-6 max-w-[745px] text-[16px] leading-[1.8] text-gray-600 dark:text-gray-300 sm:text-[18px]">
          {{ t('hero.subtitle') }}
        </p>
        <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer"
          class="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-brand-primary px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_9px_25px_rgba(79,82,255,.18)] transition-colors duration-200 hover:bg-brand-dark-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary">
          {{ t('hero.cta') }}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
        </a>
      </div>
      <div class="mx-auto mt-12 max-w-6xl lg:mt-16">
        <AutomationConsole />
      </div>
    </div>
  </section>
</template>
