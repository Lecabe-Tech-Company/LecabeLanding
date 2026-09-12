<script setup lang="ts">
import type { ProcessStep } from '@/types/service'

defineProps<{ steps: ProcessStep[] }>()
</script>

<template>
  <ol
    class="grid list-none gap-3.5 p-0"
    style="grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr))"
  >
    <li
      v-for="(step, index) in steps"
      :key="step.title"
      v-reveal="index * 80"
      class="flex flex-col gap-2.5 rounded-2xl border border-gray-900/10 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]"
    >
      <span
        class="inline-flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-extrabold"
        :class="index === 0
          ? 'bg-brand-primary text-white'
          : 'bg-brand-primary/10 text-brand-primary dark:bg-brand-light-primary/15 dark:text-brand-light-primary'"
      >
        {{ index + 1 }}
      </span>
      <h3 class="text-[15px] font-bold leading-snug text-gray-900 dark:text-white">
        {{ step.title }}
      </h3>
      <p class="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400">
        {{ step.description }}
      </p>
    </li>
  </ol>
</template>
