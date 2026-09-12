<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

/** Values shaped like one integer with optional affixes count up; the rest render as written. */
const COUNTABLE = /^(\D*)(\d+)(\D*)$/
const KEYS = ['projects', 'satisfaction', 'support', 'experience']

const { t } = useI18n()

const root = ref<HTMLElement | null>(null)
const displayed = ref<string[]>([])

const metrics = computed(() =>
  KEYS.map(key => ({
    key,
    value: t(`metrics.items.${key}.value`),
    label: t(`metrics.items.${key}.label`)
  }))
)

let observer: IntersectionObserver | null = null
const frames: number[] = []

const countUp = (index: number, prefix: string, target: number, suffix: string): void => {
  const start = performance.now()
  const duration = 1100

  const step = (now: number) => {
    const progress = Math.min(1, (now - start) / duration)
    const eased = 1 - Math.pow(1 - progress, 3)
    displayed.value[index] = `${prefix}${Math.round(target * eased)}${suffix}`
    if (progress < 1) frames.push(requestAnimationFrame(step))
  }

  frames.push(requestAnimationFrame(step))
}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  displayed.value = metrics.value.map(metric =>
    !reduced && COUNTABLE.test(metric.value) ? metric.value.replace(/\d+/, '0') : metric.value
  )

  if (reduced || !root.value) return

  observer = new IntersectionObserver(
    entries => {
      if (!entries.some(entry => entry.isIntersecting)) return
      observer?.disconnect()
      observer = null
      metrics.value.forEach((metric, index) => {
        const match = COUNTABLE.exec(metric.value)
        if (match) countUp(index, match[1], Number(match[2]), match[3])
      })
    },
    { threshold: 0.3 }
  )
  observer.observe(root.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  frames.forEach(cancelAnimationFrame)
})
</script>

<template>
  <section
    ref="root"
    :aria-label="t('metrics.title')"
    class="border-y border-gray-900/[0.08] bg-white dark:border-white/10 dark:bg-white/[0.02]"
  >
    <div
      class="mx-auto grid max-w-7xl gap-5 px-6 py-7 md:px-12"
      style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr))"
    >
      <div
        v-for="(metric, index) in metrics"
        :key="metric.key"
        v-reveal="index * 80"
        class="flex flex-col gap-1 border-l-2 border-brand-primary/25 py-1.5 pl-[18px] dark:border-brand-light-primary/30"
      >
        <div class="text-[34px] font-extrabold leading-none tracking-[-0.02em] tabular-nums text-gray-900 dark:text-white">
          {{ displayed[index] ?? metric.value }}
        </div>
        <div class="text-sm font-medium text-gray-600 dark:text-gray-400">
          {{ metric.label }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>
