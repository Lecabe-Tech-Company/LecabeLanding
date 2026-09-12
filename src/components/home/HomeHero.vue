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
</script>

<template>
  <section
    aria-labelledby="home-hero-title"
    class="relative overflow-hidden"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_85%_-10%,rgba(79,82,255,.14),transparent_60%),radial-gradient(600px_400px_at_0%_110%,rgba(47,224,176,.12),transparent_60%)] dark:bg-[radial-gradient(900px_500px_at_85%_-10%,rgba(79,82,255,.3),transparent_60%),radial-gradient(600px_400px_at_0%_110%,rgba(47,224,176,.18),transparent_60%)]"
      aria-hidden="true"
    />

    <div class="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-14 pt-16 md:px-12 lg:grid-cols-2">
      <div class="flex flex-col gap-[22px]">
        <p
          v-reveal
          class="inline-flex items-center gap-2 self-start rounded-full border border-brand-primary/[0.18] bg-brand-primary/[0.08] px-3 py-1.5 text-[13px] font-semibold text-brand-dark-primary dark:border-brand-light-primary/25 dark:bg-brand-light-primary/10 dark:text-brand-light-primary"
        >
          <span
            class="hero-badge-dot h-2 w-2 rounded-full bg-brand-alternative"
            aria-hidden="true"
          />
          {{ t('hero.badge') }}
        </p>

        <h1
          id="home-hero-title"
          v-reveal="60"
          class="text-[clamp(2.125rem,4.6vw,3.75rem)] font-extrabold leading-[1.06] tracking-[-0.025em] text-gray-900 dark:text-white"
        >
          {{ t('hero.title') }}
        </h1>

        <p
          v-reveal="120"
          class="max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-300"
        >
          {{ t('hero.subtitle') }}
        </p>

        <div
          v-reveal="180"
          class="mt-1.5 flex flex-wrap gap-3"
        >
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2.5 rounded-xl bg-brand-primary px-5 py-4 text-base font-bold text-white shadow-[0_10px_30px_rgba(79,82,255,.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark-primary hover:shadow-[0_16px_36px_rgba(79,82,255,.34)]"
          >
            {{ t('hero.cta') }}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <a
            href="#servicos"
            class="inline-flex items-center rounded-xl border border-gray-900/[0.12] bg-white px-5 py-4 text-base font-semibold text-gray-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-primary dark:border-white/15 dark:bg-white/[0.06] dark:text-white dark:hover:border-brand-light-primary"
          >
            {{ t('hero.ctaSecondary') }}
          </a>
        </div>

        <ul
          v-reveal="240"
          class="mt-3.5 flex list-none flex-wrap gap-x-6 gap-y-2.5 p-0 text-sm font-medium text-gray-600 dark:text-gray-400"
        >
          <li
            v-for="guarantee in guarantees"
            :key="guarantee"
            class="flex items-center gap-[7px]"
          >
            <span class="inline-flex text-brand-alternative">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="m5 12 5 5L20 7" />
              </svg>
            </span>
            {{ guarantee }}
          </li>
        </ul>
      </div>

      <div v-reveal="160">
        <AutomationConsole />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-badge-dot {
  animation: hero-badge-ping 2s infinite;
}

@keyframes hero-badge-ping {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(47, 224, 176, 0.55);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(47, 224, 176, 0);
  }
}
</style>
