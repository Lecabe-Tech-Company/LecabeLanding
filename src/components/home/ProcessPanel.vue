<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LineIcon from '@/components/ui/LineIcon.vue'

const STEP_KEYS = ['discovery', 'requirements', 'design', 'development', 'deployment']
const STEP_ICONS = ['search', 'catalog', 'settings', 'check', 'refresh']
const GUARANTEE_ICONS = ['checkCircle', 'clock', 'refresh']

const { t, tm } = useI18n()

const durations = computed(() => tm('timeline.durations') as string[])

const steps = computed(() =>
  STEP_KEYS.map((key, index) => ({
    key,
    icon: STEP_ICONS[index],
    number: String(index + 1).padStart(2, '0'),
    title: t(`timeline.steps.${key}.title`),
    description: t(`timeline.steps.${key}.description`),
    duration: durations.value?.[index] ?? '',
    isFirst: index === 0,
    isLast: index === STEP_KEYS.length - 1
  }))
)

const guarantees = computed(() => {
  const list = tm('timeline.guarantees') as unknown[]
  return (list ?? []).map((_, index) => ({
    icon: GUARANTEE_ICONS[index],
    title: t(`timeline.guarantees[${index}].title`),
    description: t(`timeline.guarantees[${index}].description`)
  }))
})
</script>

<template>
  <div class="relative flex flex-col gap-[22px] overflow-hidden rounded-[20px] bg-brand-dark p-7 text-brand-light">
    <div
      class="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,82,255,.45),transparent_70%)]"
      aria-hidden="true"
    />

    <div class="relative flex flex-wrap items-baseline justify-between gap-3">
      <h3 class="text-xl font-bold text-white">
        {{ t('timeline.title') }}
      </h3>
      <span class="text-[13px] text-[#B4BCD0]">{{ t('timeline.summary') }}</span>
    </div>

    <ol class="relative m-0 flex list-none flex-col overflow-hidden rounded-[14px] border border-white/10 p-0">
      <li
        v-for="step in steps"
        :key="step.key"
        v-reveal="steps.indexOf(step) * 90"
        class="grid grid-cols-[40px_minmax(0,1fr)] items-start gap-3.5 px-[18px] py-4 transition-colors duration-300 hover:bg-white/[0.06]"
        :class="step.isFirst ? 'bg-brand-primary/10' : 'border-t border-white/10'"
      >
        <span
          class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10"
          :class="step.isFirst ? 'bg-brand-primary text-white' : 'bg-white/[0.06] text-[#B4BCD0]'"
        >
          <LineIcon
            :name="step.icon"
            :size="18"
          />
        </span>

        <div class="flex min-w-0 flex-col gap-1.5">
          <h4 class="m-0 flex items-center gap-2.5 text-base font-bold leading-tight text-brand-light">
            <span class="text-[11px] font-bold tracking-[0.08em] text-[#868CAA]">{{ step.number }}</span>
            {{ step.title }}
          </h4>
          <span
            class="inline-flex items-center gap-1.5 self-start whitespace-nowrap text-xs font-bold tracking-wide"
            :class="step.isLast ? 'text-brand-alternative' : 'text-[#9BA3FF]'"
          >
            <LineIcon
              name="clock"
              :size="12"
            />
            {{ step.duration }}
          </span>
          <p class="mt-0.5 text-sm leading-relaxed text-[#B4BCD0]">
            {{ step.description }}
          </p>
        </div>
      </li>
    </ol>

    <div
      class="relative grid gap-2.5 border-t border-[#B4BCD0]/[0.18] pt-[18px]"
      style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))"
    >
      <div
        v-for="guarantee in guarantees"
        :key="guarantee.title"
        class="flex items-start gap-2.5"
      >
        <span class="mt-0.5 inline-flex flex-none text-brand-alternative">
          <LineIcon
            :name="guarantee.icon"
            :size="18"
          />
        </span>
        <div>
          <div class="text-sm font-bold text-white">
            {{ guarantee.title }}
          </div>
          <div class="text-[13px] text-[#B4BCD0]">
            {{ guarantee.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
