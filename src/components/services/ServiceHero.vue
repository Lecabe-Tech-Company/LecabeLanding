<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ServiceBreadcrumb from '@/components/services/ServiceBreadcrumb.vue'
import ServiceMetrics from '@/components/services/ServiceMetrics.vue'

interface Metric {
  value: string
  label: string
}

defineProps<{
  serviceName: string
  title: string
  subtitle: string
  ctaText: string
  whatsappUrl: string
  highlights: string[]
  metrics: Metric[]
}>()

const { t } = useI18n()
</script>

<template>
  <section
    aria-labelledby="service-title"
    class="relative overflow-hidden"
  >
    <!-- Soft brand glow anchored to the top-right corner, as in the design -->
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_460px_at_90%_-10%,rgba(79,82,255,.14),transparent_60%)] dark:bg-[radial-gradient(800px_460px_at_90%_-10%,rgba(79,82,255,.28),transparent_60%)]"
      aria-hidden="true"
    />

    <div class="relative mx-auto grid max-w-7xl items-center gap-10 px-6 pb-12 pt-16 md:px-12 lg:grid-cols-2">
      <div class="flex flex-col gap-5">
        <ServiceBreadcrumb
          v-reveal
          :service-name="serviceName"
        />

        <h1
          id="service-title"
          v-reveal="60"
          class="text-[clamp(2rem,4.2vw,3.375rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-gray-900 dark:text-white"
        >
          {{ title }}
        </h1>

        <p
          v-reveal="120"
          class="max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-300"
        >
          {{ subtitle }}
        </p>

        <div
          v-reveal="180"
          class="mt-1 flex flex-wrap gap-3"
        >
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2.5 rounded-xl bg-brand-primary px-5 py-4 text-base font-bold text-white shadow-[0_10px_30px_rgba(79,82,255,.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark-primary"
          >
            {{ ctaText }}
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
            href="#faq"
            class="inline-flex items-center rounded-xl border border-gray-900/[0.12] bg-white px-5 py-4 text-base font-semibold text-gray-900 transition-colors duration-200 hover:border-brand-primary dark:border-white/15 dark:bg-white/[0.06] dark:text-white dark:hover:border-brand-light-primary"
          >
            {{ t('serviceUi.faqAnchor') }}
          </a>
        </div>

        <ul
          v-reveal="240"
          :aria-label="t('serviceUi.highlights')"
          class="mt-2 flex list-none flex-wrap gap-2 p-0"
        >
          <li
            v-for="highlight in highlights"
            :key="highlight"
            class="rounded-full border border-brand-primary/[0.16] bg-brand-primary/[0.08] px-3 py-1.5 text-[13px] font-semibold text-brand-dark-primary dark:border-brand-light-primary/25 dark:bg-brand-light-primary/10 dark:text-brand-light-primary"
          >
            {{ highlight }}
          </li>
        </ul>
      </div>

      <ServiceMetrics :metrics="metrics" />
    </div>
  </section>
</template>
