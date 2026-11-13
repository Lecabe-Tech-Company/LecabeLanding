<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AutomationConsole from '@/components/home/AutomationConsole.vue'

defineProps<{ whatsappUrl: string }>()

const { t, tm } = useI18n()

const guarantees = computed(() => {
  const list = tm('hero.guarantees') as unknown[]
  return (list ?? []).map((_, index) => t(`hero.guarantees[${index}]`))
})

const connectedApps = ['Excel', 'SharePoint', 'Slack', 'Notion', 'ERP', 'CRM']
</script>

<template>
  <section aria-labelledby="home-hero-title" class="relative overflow-hidden">
    <!-- Subtle brand illumination on the hero itself, not a colored section background -->
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(880px_460px_at_92%_8%,rgba(79,82,255,.085),transparent_70%)] dark:bg-[radial-gradient(880px_460px_at_92%_8%,rgba(79,82,255,.16),transparent_70%)]" aria-hidden="true" />

    <div class="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-16 md:px-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 lg:pb-20 lg:pt-20">
      <div class="flex flex-col items-start gap-6">
        <p class="inline-flex items-center gap-2 rounded-full border border-brand-primary/15 bg-brand-primary/[0.06] px-3 py-1.5 text-xs font-semibold text-brand-dark-primary dark:border-brand-light-primary/25 dark:bg-brand-light-primary/10 dark:text-brand-light-primary">
          <span class="h-1.5 w-1.5 rounded-full bg-brand-alternative" aria-hidden="true" />
          {{ t('hero.badge') }}
        </p>

        <!-- Keep the primary LCP candidate visible without JS-driven reveal animation -->
        <h1
          id="home-hero-title"
          class="max-w-[670px] text-[clamp(2.5rem,4.6vw,4.15rem)] font-extrabold leading-[1.045] tracking-[-0.045em] text-gray-900 dark:text-white"
        >
          {{ t('hero.title') }}
        </h1>

        <p class="max-w-[590px] text-[16px] leading-[1.8] text-gray-600 dark:text-gray-300 md:text-[18px]">
          {{ t('hero.subtitle') }}
        </p>

        <div class="flex flex-wrap gap-3">
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex min-h-12 items-center gap-3 rounded-xl bg-brand-primary px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_28px_rgba(79,82,255,.18)] transition-colors duration-200 hover:bg-brand-dark-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary md:text-base"
          >
            {{ t('hero.cta') }}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </a>

          <a
            href="#servicos"
            class="inline-flex min-h-12 items-center rounded-xl border border-gray-900/10 bg-white px-5 py-3.5 text-sm font-semibold text-gray-900 transition-colors duration-200 hover:border-brand-primary dark:border-white/15 dark:bg-white/[0.04] dark:text-white md:text-base"
          >
            {{ t('hero.ctaSecondary') }}
          </a>
        </div>

        <div class="w-full max-w-[620px] border-t border-gray-900/[0.08] pt-5 dark:border-white/10">
          <p class="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">{{ t('hero.integrationLabel') }}</p>
          <ul class="m-0 flex list-none flex-wrap gap-2 p-0" :aria-label="t('hero.integrationLabel')">
            <li
              v-for="app in connectedApps"
              :key="app"
              class="rounded-lg border border-gray-900/[0.09] bg-white/85 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:border-white/10 dark:bg-white/[0.035] dark:text-gray-200"
            >
              {{ app }}
            </li>
          </ul>
        </div>

        <ul class="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-xs font-medium text-gray-500 dark:text-gray-400">
          <li v-for="guarantee in guarantees" :key="guarantee" class="inline-flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" class="text-brand-primary dark:text-brand-alternative" aria-hidden="true">
              <path d="m5 12 5 5L20 7" />
            </svg>
            {{ guarantee }}
          </li>
        </ul>
      </div>

      <AutomationConsole />
    </div>
  </section>
</template>
