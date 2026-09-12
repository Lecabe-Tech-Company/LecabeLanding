<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

interface Metric {
  value: string
  label: string
}

const props = withDefaults(defineProps<{ metrics: Metric[]; animated?: boolean }>(), {
  animated: true
})

/**
 * Only values shaped like a single integer with optional affixes count up
 * ("30+", "100%", "24h"). Anything else — "99.5%", "24/7", "WCAG AA", "Figma" —
 * is rendered as-is, because a partially counted value reads as a wrong number.
 */
const COUNTABLE = /^(\D*)(\d+)(\D*)$/

const root = ref<HTMLElement | null>(null)
const displayed = ref<string[]>([])

const shouldAnimate = computed(
  () =>
    props.animated &&
    typeof window !== 'undefined' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
)

let observer: IntersectionObserver | null = null
const timers: ReturnType<typeof setInterval>[] = []

const countUp = (index: number, prefix: string, target: number, suffix: string): void => {
  const steps = 40
  const increment = target / steps
  let current = 0

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    displayed.value[index] = `${prefix}${Math.floor(current)}${suffix}`
  }, 1200 / steps)

  timers.push(timer)
}

const start = (): void => {
  props.metrics.forEach((metric, index) => {
    const match = COUNTABLE.exec(metric.value)
    if (!match) return
    setTimeout(() => countUp(index, match[1], Number(match[2]), match[3]), index * 90)
  })
}

onMounted(() => {
  displayed.value = props.metrics.map(metric =>
    shouldAnimate.value && COUNTABLE.test(metric.value) ? metric.value.replace(/\d+/, '0') : metric.value
  )

  if (!shouldAnimate.value || !root.value) return

  observer = new IntersectionObserver(
    entries => {
      if (!entries.some(entry => entry.isIntersecting)) return
      observer?.disconnect()
      observer = null
      start()
    },
    { threshold: 0.3 }
  )
  observer.observe(root.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  timers.forEach(clearInterval)
})
</script>

<template>
  <!-- Always two columns: four metrics read as a balanced block beside the
       headline, instead of breaking 3 + 1 on mid-width columns. -->
  <div
    ref="root"
    class="grid grid-cols-2 gap-3"
  >
    <div
      v-for="(metric, index) in metrics"
      :key="metric.label"
      v-reveal="index * 80"
      class="flex flex-col gap-1.5 rounded-2xl border border-gray-900/10 bg-white p-5 shadow-[0_1px_2px_rgba(30,30,80,.06),0_6px_20px_rgba(30,30,80,.07)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none"
    >
      <div
        class="text-[30px] font-extrabold leading-none tracking-[-0.02em] tabular-nums"
        :class="index % 2 ? 'text-gray-900 dark:text-white' : 'text-brand-primary dark:text-brand-light-primary'"
      >
        {{ displayed[index] ?? metric.value }}
      </div>
      <div class="text-[13px] font-medium leading-snug text-gray-600 dark:text-gray-400">
        {{ metric.label }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>
