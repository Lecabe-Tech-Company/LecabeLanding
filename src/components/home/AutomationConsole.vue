<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import LineIcon from '@/components/ui/LineIcon.vue'

/**
 * Illustrative console showing what a running automation looks like — a
 * monthly invoicing routine reading orders, validating them, pushing to the
 * ERP and issuing invoices.
 *
 * It is a simulation, not client data, and says so in its own caption. The
 * ticking exists to make the idea legible at a glance; it stops entirely under
 * `prefers-reduced-motion`, where the panel renders its final state.
 */
const TOTAL = 128
const TICK_MS = 2400
const STEP_ICONS = ['inventory', 'check', 'channels', 'reports']

interface LogEvent {
  text: string
  tag: string
  tone: 'ok' | 'info' | 'warn'
}

const TONES = {
  ok: { color: '#2FE0B0', background: 'rgba(47,224,176,.13)' },
  info: { color: '#8B8DFF', background: 'rgba(79,82,255,.18)' },
  warn: { color: '#F5B94A', background: 'rgba(245,185,74,.13)' }
} as const

const { t, tm } = useI18n()

const tick = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

const stepLabels = computed(() => tm('console.steps') as string[])
const kpiLabels = computed(() => tm('console.kpis') as string[])
const events = computed(() => {
  const list = tm('console.events') as unknown[]
  return list.map((_, index) => ({
    text: t(`console.events[${index}].text`),
    tag: t(`console.events[${index}].tag`),
    tone: t(`console.events[${index}].tone`) as LogEvent['tone']
  }))
})

const done = computed(() => Math.min(TOTAL, 96 + tick.value * 3))
const percent = computed(() => Math.round((done.value / TOTAL) * 100))
const activeStep = computed(() => tick.value % STEP_ICONS.length)

/** Clock anchored to a fixed start so the panel reads as one continuous run. */
const clockAt = (offset: number): string => {
  const base = new Date()
  base.setHours(9, 14, 0, 0)
  return new Date(base.getTime() + offset * 47000).toTimeString().slice(0, 8)
}

const clock = computed(() => clockAt(tick.value))

const steps = computed(() =>
  STEP_ICONS.map((icon, index) => {
    const isDone = index < activeStep.value
    const isActive = index === activeStep.value
    return {
      icon,
      label: stepLabels.value[index] ?? '',
      isDone,
      isActive
    }
  })
)

const logRows = computed(() => {
  const list = events.value
  if (list.length === 0) return []
  return [0, 1, 2, 3].map(row => {
    const event = list[(tick.value + 3 - row) % list.length]
    return {
      ...event,
      ...(TONES[event.tone] ?? TONES.ok),
      time: clockAt(tick.value - row),
      opacity: 1 - row * 0.22
    }
  })
})

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    tick.value += 1
  }, TICK_MS)
})

onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div
    class="automation-console relative"
    role="img"
    :aria-label="t('console.label')"
  >
    <!-- Coloured bloom behind the panel -->
    <div
      class="pointer-events-none absolute -inset-x-[8%] -bottom-[10%] h-3/5 rounded-[40px] bg-gradient-to-br from-brand-primary/20 to-brand-alternative/20 blur-[40px]"
      aria-hidden="true"
    />

    <div
      class="relative flex flex-col overflow-hidden rounded-[20px] border border-white/10 bg-brand-dark text-brand-light shadow-[0_30px_80px_rgba(30,30,80,.35),inset_0_1px_0_rgba(255,255,255,.06)]"
    >
      <!-- Faint grid, faded out towards the bottom -->
      <div
        class="console-grid pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <header class="relative flex items-center justify-between gap-3 border-b border-white/10 px-[18px] py-3.5">
        <div class="flex items-center gap-3">
          <span
            class="flex gap-1.5"
            aria-hidden="true"
          >
            <span
              v-for="dot in 3"
              :key="dot"
              class="h-[9px] w-[9px] rounded-full bg-white/15"
            />
          </span>
          <span class="text-xs font-semibold tracking-wide text-[#868CAA]">{{ t('console.caption') }}</span>
        </div>
        <span class="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-brand-alternative">
          <span
            class="console-pulse h-[7px] w-[7px] rounded-full bg-brand-alternative"
            aria-hidden="true"
          />
          {{ t('console.status') }}
        </span>
      </header>

      <div class="relative flex flex-col gap-[22px] px-[18px] pb-1.5 pt-[22px]">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div class="mb-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#868CAA]">
              {{ t('console.cycle') }}
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-[40px] font-extrabold leading-none tracking-[-0.03em] tabular-nums">{{ done }}</span>
              <span class="text-sm font-medium text-[#B4BCD0]">{{ t('console.cycleOf', { total: TOTAL }) }}</span>
            </div>
          </div>
          <div class="text-right">
            <div class="mb-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#868CAA]">
              {{ t('console.lastRun') }}
            </div>
            <div class="text-[22px] font-extrabold leading-none tracking-[-0.02em] tabular-nums text-brand-alternative">
              {{ clock }}
            </div>
          </div>
        </div>

        <div>
          <div
            class="relative h-1.5 overflow-hidden rounded-[3px] bg-white/10"
            role="progressbar"
            :aria-valuenow="percent"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-label="t('console.progress')"
          >
            <div
              class="absolute inset-y-0 left-0 rounded-[3px] bg-gradient-to-r from-brand-primary to-brand-alternative transition-[width] duration-[1200ms] ease-out"
              :style="{ width: `${percent}%` }"
            />
          </div>

          <ol class="mt-3.5 grid list-none grid-cols-4 gap-2 p-0">
            <li
              v-for="step in steps"
              :key="step.icon"
              class="flex min-w-0 flex-col gap-2"
            >
              <span
                class="inline-flex h-[26px] w-[26px] items-center justify-center rounded-lg border transition-all duration-500"
                :class="step.isDone
                  ? 'border-brand-alternative/35 bg-brand-alternative/15 text-brand-alternative'
                  : step.isActive
                    ? 'border-brand-primary bg-brand-primary text-white'
                    : 'border-white/10 bg-white/5 text-[#565E72]'"
              >
                <LineIcon
                  :name="step.icon"
                  :size="14"
                />
              </span>
              <span
                class="text-xs font-semibold leading-tight transition-colors duration-500"
                :class="step.isDone || step.isActive ? 'text-brand-light' : 'text-[#565E72]'"
              >{{ step.label }}</span>
            </li>
          </ol>
        </div>

        <div class="flex flex-col border-t border-white/10">
          <div class="flex items-center justify-between px-0 pb-2 pt-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[#868CAA]">
            <span>{{ t('console.logTitle') }}</span>
            <span class="font-semibold normal-case tracking-normal text-[#565E72] tabular-nums">{{ clock }}</span>
          </div>
          <ul class="m-0 flex list-none flex-col gap-0.5 p-0 font-mono text-xs">
            <li
              v-for="row in logRows"
              :key="row.time + row.text"
              class="grid grid-cols-[52px_minmax(0,1fr)_auto] items-center gap-3 border-b border-white/5 py-[7px] transition-opacity duration-500"
              :style="{ opacity: row.opacity }"
            >
              <span class="text-[#565E72]">{{ row.time }}</span>
              <span class="truncate text-[#D4D8E8]">{{ row.text }}</span>
              <span
                class="rounded-[5px] px-[7px] py-[3px] text-[10px] font-bold tracking-[0.06em]"
                :style="{ color: row.color, background: row.background }"
              >{{ row.tag }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="relative grid grid-cols-3 border-t border-white/10 bg-white/[0.03]">
        <div
          v-for="(value, index) in [String(TOTAL), '4', '0 min']"
          :key="index"
          class="px-[18px] py-3.5"
          :class="index < 2 && 'border-r border-white/10'"
        >
          <div class="text-xl font-extrabold leading-none tracking-[-0.02em] tabular-nums">
            {{ value }}
          </div>
          <div class="mt-1 text-[11px] font-medium text-[#868CAA]">
            {{ kpiLabels[index] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.console-grid {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: radial-gradient(ellipse at top, black 40%, transparent 85%);
  -webkit-mask-image: radial-gradient(ellipse at top, black 40%, transparent 85%);
}

.tabular-nums {
  font-variant-numeric: tabular-nums;
}

.automation-console {
  animation: console-float 7s ease-in-out infinite;
}

.console-pulse {
  animation: console-ping 2s infinite;
}

@keyframes console-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes console-ping {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(47, 224, 176, 0.55);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(47, 224, 176, 0);
  }
}
</style>
