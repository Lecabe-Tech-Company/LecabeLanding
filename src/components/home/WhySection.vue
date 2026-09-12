<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LineIcon from '@/components/ui/LineIcon.vue'
import ProcessPanel from '@/components/home/ProcessPanel.vue'

const DIFFERENTIATOR_KEYS = ['family', 'custom', 'partnership']
const DIFFERENTIATOR_ICONS = ['user', 'settings', 'reports']
const DIAGNOSIS_ICONS = { q1: 'search', q2: 'channels', q3: 'reports' }

const { t } = useI18n()

const differentiators = computed(() =>
  DIFFERENTIATOR_KEYS.map((key, index) => ({
    key,
    icon: DIFFERENTIATOR_ICONS[index],
    title: t(`about.differentiators.${key}.title`),
    description: t(`about.differentiators.${key}.description`)
  }))
)

const diagnosisQuestions = computed(() =>
  (Object.keys(DIAGNOSIS_ICONS) as (keyof typeof DIAGNOSIS_ICONS)[]).map(key => ({
    key,
    icon: DIAGNOSIS_ICONS[key],
    text: t(`about.diagnosis.${key}`)
  }))
)
</script>

<template>
  <section
    id="processo"
    aria-labelledby="why-title"
    class="scroll-mt-24"
  >
    <div class="mx-auto grid max-w-7xl items-start gap-14 px-6 pb-[72px] pt-20 md:px-12 lg:grid-cols-2">
      <div class="flex flex-col gap-5">
        <p
          v-reveal
          class="text-[13px] font-bold uppercase tracking-[0.08em] text-brand-primary dark:text-brand-light-primary"
        >
          {{ t('about.eyebrow') }}
        </p>

        <h2
          id="why-title"
          v-reveal="60"
          class="text-[clamp(1.75rem,3.4vw,2.625rem)] font-extrabold leading-tight tracking-[-0.02em] text-gray-900 dark:text-white"
        >
          {{ t('about.title') }}
        </h2>

        <p
          v-reveal="120"
          class="text-[17px] leading-relaxed text-gray-600 dark:text-gray-300"
        >
          {{ t('about.content') }}
        </p>

        <ul
          v-reveal="150"
          class="m-0 flex list-none flex-col gap-2.5 rounded-[14px] border border-brand-primary/[0.14] bg-brand-primary/[0.06] px-5 py-[18px] dark:border-brand-light-primary/20 dark:bg-brand-light-primary/[0.07]"
        >
          <li class="text-xs font-bold uppercase tracking-[0.08em] text-brand-primary dark:text-brand-light-primary">
            {{ t('about.diagnosis.title') }}
          </li>
          <li
            v-for="question in diagnosisQuestions"
            :key="question.key"
            class="flex gap-2.5 text-[15px] leading-normal text-gray-900 dark:text-gray-100"
          >
            <span class="mt-0.5 flex-none text-brand-primary dark:text-brand-light-primary">
              <LineIcon
                :name="question.icon"
                :size="16"
              />
            </span>
            {{ question.text }}
          </li>
        </ul>

        <div class="mt-2 grid gap-3">
          <div
            v-for="(differentiator, index) in differentiators"
            :key="differentiator.key"
            v-reveal="index * 80"
            class="flex gap-3.5 rounded-[14px] border border-gray-900/10 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(30,30,80,.08)] dark:border-white/10 dark:bg-white/[0.04]"
          >
            <span
              class="inline-flex h-10 w-10 flex-none items-center justify-center rounded-[10px] bg-brand-primary/[0.08] text-brand-primary dark:bg-brand-light-primary/15 dark:text-brand-light-primary"
            >
              <LineIcon :name="differentiator.icon" />
            </span>
            <div>
              <h3 class="mb-1 text-base font-bold text-gray-900 dark:text-white">
                {{ differentiator.title }}
              </h3>
              <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {{ differentiator.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <ProcessPanel />
    </div>
  </section>
</template>
